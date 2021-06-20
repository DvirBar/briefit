import { Request, Response, NextFunction } from "express";

const authAdmin = (_req: Request, res: Response, next: NextFunction) => {
    try {
        if(!res.locals.user.isAdmin)
            return res.status(403).send("Forbidden resource");
        
        next();
    }
    catch(e) {
        return res.status(500).send({ msg: "Internal server error" });
    }       
};

export default authAdmin;
