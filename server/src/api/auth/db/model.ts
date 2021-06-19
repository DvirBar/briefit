import mongoose from "mongoose";
import { validateEmail, validateName, validatePassword } from "./validation";
const Schema = mongoose.Schema;

interface User {
    firstName: string;
    lastName: string
    email: string;
    password: string;
    formerPasswords: string;
    failedAttempts: number;
    blocked: {
        isBlocked: boolean;
        expiry: Date;
    };
    isAdmin: boolean;
    isPremium: boolean;
    dateCreated: Date;
}

export const UserSchema = new Schema<User>({
    firstName: {
        type: String,
        validate: {
            validator: validateName,
            message: "First name is invalid"    
        },
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        validate: {
            validator: validateName,
            message: "Last name is invalid"  
        },
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        validate: {
            validator: validateEmail,
            message: "Email is invalid"
        },
        required: [true, "Email is required"]
    },
    failedAttempts: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        validate: {
            validator: validatePassword,
            message: "Password is invalid"
        },
        required: [true, "Password is required"],
    },
    formerPasswords: [{
        type: String
    }],
    blocked: {
        isBlocked: {
            type: Boolean
        },
        expiry: {
            type: Date
        }
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    dataCreated: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<User>("User", UserSchema);