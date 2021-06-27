import React from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Router from "./router/Router";
import "./App.module.scss";

axios.defaults.baseURL = process.env.NODE_ENV === "production"
  ? "" : "http://10.0.0.7:3000/api";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="App">
        <Router />
      </div>
    </BrowserRouter>

  );
}

export default App;
