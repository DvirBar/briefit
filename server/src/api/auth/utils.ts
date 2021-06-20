import bcrypt from "bcryptjs";

export const hashString = async(string: string): Promise<string> => {
    if(string.length <= 64) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(string, salt);
    }

    else {
        throw new Error("Dos attempt! user tried to insert password greater than 64.");
    }
};