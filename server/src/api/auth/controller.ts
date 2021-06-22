import * as UserService from "./service";
import { Request, Response, NextFunction } from "express";
import { 
    clearAccessCookie, 
    clearRefreshCookie, 
    createAccessCookie, 
    createRefreshCookie, 
    getRefreshCookie, 
    userWithoutPassword
} from "./utils";
import { SuccessEdit, SuccessDelete } from "./messages.json";

export function getUserByToken(_req: Request, res: Response): Response {
    return res.send(userWithoutPassword(res.locals.user));
}

export async function register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const {
            accessToken,
            refreshToken,
            user
        } = await UserService.register(req.body);

        createAccessCookie(res, accessToken);
        createRefreshCookie(res, refreshToken);

        return res.send(user);
    }

    catch(err) {
        next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const {
        email,
        password
    } = req.body;
    
    try {
        const {
            accessToken,
            refreshToken,
            user
        } = await UserService.login(email, password);

        createAccessCookie(res, accessToken);
        createRefreshCookie(res, refreshToken);

        return res.send(user);
    }

    catch(err) {
        next(err);
    }
}

export async function refreshToken(req: Request, res: Response): Promise<Response> {
    try {
        const refreshToken = getRefreshCookie(req);

        if(refreshToken) {
            const accessToken = await UserService.refreshToken(refreshToken);
            createAccessCookie(res, accessToken);
            return res.send();
        }

        throw new Error();
    }
    
    catch(err) {
        // Clear access token
        clearAccessCookie(res);

        // Clear refresh token
        clearRefreshCookie(res);
        return res.status(401).send();
    }
}

export function logout(_req: Request, res: Response, next: NextFunction): Response | void {
    try {
        // Clear acces token
        clearAccessCookie(res);
        // Clear refresh token
        clearRefreshCookie(res);
        return res.send({ msg: "Logged out successfully" });
    }
    catch(err) {
        next(err);
    }
}

export async function editUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
        const editedUser = await UserService.editUser(req.body, res.locals.user.id);
        res.status(SuccessEdit.status).send({
            msg: SuccessEdit.message,
            user: editedUser
        });
    }
    catch(err) {
        next(err);
    }
}

export async function removeUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const delUserId = req.params.id;

    try {
        await UserService.removeUser(delUserId);

        return res.status(SuccessDelete.status).send(SuccessDelete.message);
    }
    catch(err) {
        next(err);
    }
}
