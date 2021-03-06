import { EnhancedModel } from "../../../db/types";
import { Document } from "mongoose";

export interface UserSecureDetails {
    firstName: string;
    lastName: string
    email: string;
    isAdmin?: boolean;
    isPremium?: boolean;
    dateCreated?: Date;
}

export interface IUser extends Document, UserSecureDetails {
    password: string;
    formerPasswords?: string;
    failedAttempts?: number;
    blocked?: {
        isBlocked: boolean;
        expiry?: Date;
    };
}

export type UserModel = EnhancedModel<IUser>;

export interface UserMethods {
    getUserByEmail: (this: UserModel, email: string) => Promise<IUser | null>;
    createUser: (this: UserModel, userDetails: IUser) => Promise<IUser>;
    editUser: (this: UserModel, userId: string, userDetails: IUser) => Promise<IUser>;
    isUserBlocked: (user: IUser) => boolean;
    blockUser:  (user: IUser, expiry?: Date) => Promise<IUser>;
    addFailedAttempt: (user: IUser) => Promise<number>; 
    resetFailedAttempts: (user: IUser) => Promise<IUser>;
    removeUser: (this: UserModel, userId: string) => Promise<void>;
}

export type UserType = UserModel & UserMethods;