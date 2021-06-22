import ErrorHandler from "./model";
import { IError, RequestMeta } from "./types";
import { GenObj } from "../../utils/objects/types";

export const createError = (errContent: GenObj, request?: RequestMeta): Promise<IError> => {
    const newError = new ErrorHandler({
        title: errContent.Error || errContent.message,
        request,
        content: errContent
    });

    return newError.save();
};