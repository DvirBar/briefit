enum Method {
    GET = "GET",
    HEAD = "HEAD",
    OPTIONS = "OPTIONS",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    TRACE = "TRACE",
    CONNECT = "CONNECT",
    PATCH = "PATCH"
}

export interface Request {
    url: string;
    method: Method;
    timestamp?: Date
}

export interface IError {
    title: string;
    request?: Request;
    content: string;
}
