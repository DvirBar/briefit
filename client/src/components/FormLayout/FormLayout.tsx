import React, { FormEvent, ReactNode } from "react";
import styles from "./FormLayout.module.scss";

interface IProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
}

function FormLayout({ onSubmit, children }: IProps): JSX.Element {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default FormLayout;
