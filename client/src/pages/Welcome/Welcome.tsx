import React from "react";
import Login from "./auth/Login/Login";
import styles from "./Welcome.module.scss";

function Welcome(): JSX.Element {
  return (
    <div className={styles.welcome}>
      <Login />
    </div>
  );
}

export default Welcome;
