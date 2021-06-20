import User, { IUser, UserType } from "./db/types";
import { UserAlreadyExists } from "./messages.json";
import { Payload, UserAccess } from "./types";
import { createAccessToken, createRefreshToken, userWithoutPassword } from "./utils";

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