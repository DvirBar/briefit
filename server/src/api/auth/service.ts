import User, { IUser, UserType } from "./db/types";

const UserModel = User as UserType;

export function register(userDetails: IUser): Promise<IUser> {
    return UserModel.createUser(userDetails);
}