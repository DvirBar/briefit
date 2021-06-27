import { GenObj } from "utils/objects/types";
import { config } from "./config";
import { ValidationError } from "./types";
import validate from "./validators";

const configFields = config.fields;

const validateField = (key: string, value: string | number | boolean) => {
  const configField = configFields[key];
  let firstError = "";

  Object.keys(configField).forEach((configItem) => {
    const { message } = configField[configItem];
    const error = validate(configItem, value, message);
    if (error && !firstError) {
      firstError = error;
    }
  });

  return firstError;
};

export default function validateForm(fields: GenObj): ValidationError {
  const errors: ValidationError = {};

  Object.keys(fields).forEach((fieldKey) => {
    const error = validateField(fieldKey, fields[fieldKey]);
    if (error) {
      errors[fieldKey] = error;
    }
  });

  return errors;
}
