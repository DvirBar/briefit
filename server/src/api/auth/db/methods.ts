import { dateInPast } from "../../../utils/dates/dates";
import { hashPassword } from "../utils";
import { UserModel, IUser } from "./types";
import { validateEmail } from "./validation";


export function getUserByEmail(this: UserModel, email: string): Promise<IUser | null> {
    if(!validateEmail(email)) {
        throw new Error("Tried to get user with invalid email address");
    }
    
    return this.findOne({ email }).exec();
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

export function isUserBlocked(user: IUser): boolean {
    if(user?.blocked?.isBlocked) {
        const expiry = user.blocked.expiry;
    
        // If no expiry and user is blocked
        if(!expiry) {
            return true;
        }

        // If expiry date had not passed
        if(!dateInPast(expiry)) {
            return true;
        }
        
        // If expiry date had passed, remove block
        user.blocked = undefined;
        user.save();
        return false;
    }
    
    return false;
}

export async function removeUser(this: UserModel, userId: string): Promise<void> {
    const user = await this.getByIdOrFail(userId);

    await user.remove();
}
