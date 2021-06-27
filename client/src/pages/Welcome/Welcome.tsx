import React from "react";
import Login from "./auth/Login/Login";
import Register from "./auth/Register/Register";
import styles from "./Welcome.module.scss";

function Welcome(): JSX.Element {
  return (
    <div className={styles.welcome}>
      <Login />
      <Register />
    </div>
  );
}

export default Welcome;
