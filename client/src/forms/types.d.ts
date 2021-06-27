import { ChangeEvent, FormEvent } from "react";
import { GenObj } from "utils/objects/types";

export interface FormHookControls<ValuesType> {
    values: ValuesType | GenObj;
    errors: ValuesType | GenObj;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (
        e: FormEvent<HTMLFormElement>,
        onSubmit: (...args: (string|number)[]) => void
    ) => void;
}

export type ValidationError = {
    [key: string]: string
}

export interface FieldsConfig {
    fields: {
        [fieldName: string]: {
            [validatorName: string]: {
                message: string
            }
        }
    }
}

type ValidFieldValues = string | number | boolean | string[] | number[]

type ValidatorFunction = (value: any | any[], message: string) => string | null;
