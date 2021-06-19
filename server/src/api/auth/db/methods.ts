import { FilterQuery } from "mongoose";
import { EnhancedModel } from "../../../db/types";
import { User } from "./model";
import { validateEmail } from "./validation";

type UserModel = EnhancedModel<User>;

export function getUserByEmail(this: UserModel, email: string): FilterQuery<User> {
    if(!validateEmail(email)) {
        throw new Error("Tried to get user with invalid email address");
    }

    return this.findOne({ email });
}

export function create(this: UserModel, userDetails: User): Promise<User> {
    const newUser = new this(userDetails);

    return newUser.save();
}

export async function edit(this: UserModel, userId: string, userDetails: User): Promise<User> {
    const user = await this.getByIdOrFail(userId);

    user.firstName = userDetails.firstName;
    user.lastName = userDetails.lastName;
    user.email = userDetails.email;

    return user.save();
}