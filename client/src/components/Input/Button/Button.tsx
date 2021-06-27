import React from "react";
import styles from "./Button.module.scss";

type ButtonTypes = "submit" | "button" | "reset" | undefined

interface IProps {
    type: ButtonTypes;
    label: string;
    onClick?: () => void
}

function Button({ type = "button", label, onClick }: IProps): JSX.Element {
  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
