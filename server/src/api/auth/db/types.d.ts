import { EnhancedModel } from "../../../db/types";
import { FilterQuery } from "mongoose";

export interface IUser extends Document {
    firstName: string;
    lastName: string
    email: string;
    password: string;
    formerPasswords?: string;
    failedAttempts?: number;
    blocked?: {
        isBlocked: boolean;
        expiry: Date;
    };
    isAdmin?: boolean;
    isPremium?: boolean;
    dateCreated?: Date;
}

export type UserModel = EnhancedModel<IUser>;

export interface UserMethods {
    getUserByEmail: (this: UserModel, email: string) => FilterQuery<IUser | null>;
    createUser: (this: UserModel, userDetails: IUser) => Promise<IUser>;
    editUser: (this: UserModel, userId: string, userDetails: IUser) => Promise<IUser>;
    removeUser: (this: UserModel, userId: string) => Promise<void>;
}

export type UserType = UserModel & UserMethods;