import { Schema } from "mongoose";
import * as staticMethods from "./methods";
import { StaticMethodsOptions } from "./types";

export function ConstructStaticMethods(schema: Schema, options: StaticMethodsOptions): void {
    const {
        customStaticMethods = {}
    } = options || {};

    schema.statics = {
        ...staticMethods,
        ...customStaticMethods
    };
}