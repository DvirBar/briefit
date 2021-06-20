import bcrypt from "bcryptjs";
import { validatePassword } from "./db/validation";

export const hashString = async(string: string): Promise<string> => {
    if(string.length <= 64) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(string, salt);
    }

    else {
        throw new Error("Dos attempt! user tried to insert password greater than 64.");
    }
};

export const hashPassword = async(password: string): Promise<string> => {
    if(validatePassword(password)) {
        return hashString(password);
    }

    throw new Error("Validation error: password is invalid");
};