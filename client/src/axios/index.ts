import axios from "axios";

axios.defaults.baseURL = process.env.NODE_ENV === "production"
  ? "" : "http://10.0.0.13:3000/api";
axios.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
