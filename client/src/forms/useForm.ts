import {
  useState, ChangeEvent, FormEvent,
} from "react";
import { GenObj } from "utils/objects/types";
import { isEmptyObject } from "utils/objects/objects";
import { FormHookControls } from "./types";
import validateForm from "./formValidators";

function useForm<ValuesType>(
  defaultValues: ValuesType,
): FormHookControls<ValuesType> {
  const [values, setValues] = useState<ValuesType>(defaultValues);
  const [errors, setErrors] = useState<ValuesType | GenObj>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>,
    onSubmit: (...args: (string|number)[]) => void,
  ) => {
    e.preventDefault();

    const formErrors = validateForm(values);
    console.log(formErrors);

    if (isEmptyObject(formErrors)) {
      onSubmit();
    } else {
      setErrors(formErrors);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
}

export default useForm;
