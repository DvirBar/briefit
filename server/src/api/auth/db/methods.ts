import { Model, FilterQuery } from "mongoose";
import { User } from "./model";
import { validateEmail } from "./validation";

export function getUserByEmail(this: Model<User>, email: string): FilterQuery<User> {
    if(!validateEmail(email)) {
        throw new Error("Tried to get user with invalid email address");
    }

    return this.findOne({ email });
}