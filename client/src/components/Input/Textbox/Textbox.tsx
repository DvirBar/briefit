import React, { ChangeEvent } from "react";
import styles from "./Textbox.module.scss";

interface IProps {
  value?: string;
  type?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  name: string;
}

function Textbox({
  value,
  type = "text",
  onChange,
  label,
  name,
  error,
}: IProps): JSX.Element {
  return (
    <div className={styles.textboxWrapper}>
      <label className={`${styles.labelText} ${error ? styles.labelError : ""}`} htmlFor={label}>{label}</label>
      <input
        className={styles.textbox}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        name={name}
      />
      <div className={styles.error}>{error}</div>
    </div>

  );
}

export default Textbox;
