import useForm from "forms/useForm";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "store/auth/actions";
import { LoginData } from "store/auth/types";
import Textbox from "components/Input/Textbox/Textbox";
import { AppDispatch } from "store/store";
import Button from "components/Input/Button/Button";
import FormLayout from "components/FormLayout/FormLayout";

function Login(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm<LoginData>({
    email: "",
    password: "",
  });

  function commitLogin() {
    dispatch(login({ email: values.email, password: values.password }));
  }

  return (
    <FormLayout onSubmit={(e) => handleSubmit(e, commitLogin)}>
      <Textbox
        value={values.email || ""}
        name="email"
        onChange={handleChange}
        error={errors.email}
        label="אימייל"
      />

      <Textbox
        value={values.password || ""}
        name="password"
        error={errors.password}
        onChange={handleChange}
        type="password"
        label="סיסמה"
      />

      <Button type="submit" label="התחברות" />
    </FormLayout>
  );
}

export default Login;
