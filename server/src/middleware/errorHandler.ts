import { NextFunction, Request, Response } from "express";
import * as ErrorService from "../services/errors/service";
import { HTTPMessage, Method } from "../services/errors/types";

const errorHandler = (err: HTTPMessage | Error, req: Request, res: Response, _next: NextFunction): Response => {
    try {
        const error = err as HTTPMessage;
        if(error.status && error.message) {
            return res.status(error.status).send(err.message);
        }

        else {
            if(process.env.NODE_ENV !== "production") {
                console.log(err);
            }

            else {
                const requestData = {
                    method: req.method as Method,
                    url: req.url
                };   

                ErrorService.createError(err, requestData);
            }
        }

        return res.status(500).send({ msg: "Internal server error" });
    } catch (err) {
        console.log(err);
        console.log("Error logging failed");
        
        return res.status(500).send({msg: "Internal server error"});
    }
};

export default errorHandler;