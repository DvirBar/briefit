import { Request } from "express";
import ErrorHandler from "./model";
import { IError } from "./types";

export const createError = (errContent: GenObj, request?: Request): Promise<IError> => {
    const newError = new ErrorHandler({
        title: errContent.Error || errContent.message,
        request,
        content: errContent
    });

    return newError.save();
};