import User, { IUser, UserType } from "./db/types";
import { UserAlreadyExists, InvalidCredentials, UserIsBlocked } from "./messages.json";
import { Payload, UserAccess } from "./types";
import { createAccessToken, createRefreshToken, userWithoutPassword, verifyAccessToken, verifyRefreshToken } from "./utils";
import bcrypt from "bcryptjs";

const UserModel = User as UserType;


export async function register(userDetails: IUser): Promise<UserAccess> {
    // Check for user with the requested email
    const possibleEmail = await UserModel.getUserByEmail(userDetails.email);
    if(possibleEmail) {
        throw UserAlreadyExists;
    }

    // Create user
    const user = await UserModel.createUser(userDetails);

    const payload: Payload = { id: user._id };
    // Sign and return token with created user id as payload
    const accessToken = createAccessToken(payload);
    const refreshToken = createRefreshToken(payload);

    const userObj = userWithoutPassword(user);

    return {
        accessToken,
        refreshToken,
        user: userObj
    };
}

export async function login(email: string, loginPassword: string): Promise<UserAccess> {
    const user = await UserModel.getUserByEmail(email);

    // Validating creadentials and checking that user is not blocked
    if(!user) {
        throw InvalidCredentials;
    }
        
    if(UserModel.isUserBlocked(user)) {
        throw UserIsBlocked;
    }

    const isMatch = bcrypt.compare(loginPassword, user.password);

    if(!isMatch) {
        const failedAttempts = await UserModel.addFailedAttempt(user);

        if(failedAttempts >= 5) {
            UserModel.blockUser(user);
            throw UserIsBlocked;
        }

        throw InvalidCredentials;
    }
        
    // Authorization completed, log user in
    UserModel.resetFailedAttempts(user);
    const tokenPayload = { id: user._id };
    const accessToken = createAccessToken(tokenPayload);
    const refreshToken = createRefreshToken(tokenPayload);
    const userObj = userWithoutPassword(user); 
        
    return {
        accessToken,
        refreshToken,
        user: userObj
    };
}

export async function refreshToken(refreshToken: string): Promise<string> {
    const decoded = verifyRefreshToken(refreshToken) as Payload;

    const user = await UserModel.getByIdOrFail(decoded.id);

    return createAccessToken({ id: user._id});
}
