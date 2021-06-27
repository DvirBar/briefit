import useForm from "forms/useForm";
import React from "react";
import { useDispatch } from "react-redux";
import { register } from "store/auth/actions";
import { RegisterData } from "store/auth/types";
import FormLayout from "components/FormLayout/FormLayout";
import Textbox from "components/Input/Textbox/Textbox";
import Button from "components/Input/Button/Button";

function Register(): JSX.Element {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const commitRegister = () => {
    dispatch(register(values));
  };

  return (
    <FormLayout onSubmit={(e) => handleSubmit(e, commitRegister)}>
      <Textbox
        value={values.firstName}
        error={errors.firstName}
        onChange={handleChange}
        name="firstName"
        label="שם"
      />

      <Textbox
        value={values.lastName}
        error={errors.lastName}
        onChange={handleChange}
        name="lastName"
        label="שם משפחה"
      />

      <Textbox
        value={values.email}
        error={errors.email}
        onChange={handleChange}
        name="email"
        label="אימייל"
      />

      <Textbox
        value={values.password}
        error={errors.password}
        onChange={handleChange}
        name="password"
        type="password"
        label="סיסמה"
      />

      <Button type="submit" label="הרשמה" />
    </FormLayout>
  );
}

export default Register;
