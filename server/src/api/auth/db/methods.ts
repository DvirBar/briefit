import { Model, FilterQuery } from "mongoose";
import { User } from "./model";
import { validateEmail } from "./validation";

type UserModel = Model<User>;

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