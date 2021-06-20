import { UserSecureDetails } from "./db/types";

export type Payload = { 
    id: string
};

export type UserAccess = {
    accessToken: string;
    refreshToken: string;
    user: UserSecureDetails;
};