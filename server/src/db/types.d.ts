type StaticMethod = (...any) => any;

export interface StaticMethodsOptions {
    customStaticMethods?: {
        [key: string]: StaticMethod
    }
}