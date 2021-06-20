import { FilterQuery } from "mongoose";
import { hashPassword } from "../utils";
import { UserModel, IUser } from "./types";
import { validateEmail } from "./validation";


export function getUserByEmail(this: UserModel, email: string): FilterQuery<IUser | null> {
    if(!validateEmail(email)) {
        throw new Error("Tried to get user with invalid email address");
    }
    
    return this.findOne({ email });
}

export async function createUser(this: UserModel, userDetails: IUser): Promise<IUser> {
    const hashedPassword = await hashPassword(userDetails.password);
    const newUser = new this({
        ...userDetails,
        password: hashedPassword
    });

    return newUser.save();
}

export async function editUser(this: UserModel, userId: string, userDetails: IUser): Promise<IUser> {
    const user = await this.getByIdOrFail(userId);

    user.firstName = userDetails.firstName;
    user.lastName = userDetails.lastName;
    user.email = userDetails.email;

    return user.save();
}

export async function removeUser(this: UserModel, userId: string): Promise<void> {
    const user = await this.getByIdOrFail(userId);

    await user.remove();
}
