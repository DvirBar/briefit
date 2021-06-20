import { Request, Response, NextFunction } from "express";
import * as UserService from "../api/auth/service";
import { getAccessCookie } from "../api/auth/utils";

const auth = async(req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const accessToken = getAccessCookie(req);

    try {
        if(!accessToken) {
            throw new Error("No access token provided");
        }
        
        const user = await UserService.getUserByToken(accessToken);

        // Check that user isn't blocked
        if(UserService.isUserBlocked(user)) {
            throw "Blocked user attempted to get protected resource";
        }

        res.locals.user = user;
        next();     
    }
    catch(err) {
        return res.status(401).send("Unauthorized");
    }
};


export default auth;