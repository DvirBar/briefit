import axios from "axios";
import { reduceGetUser } from "./slice";
import { AppDispatch } from "../store";
import { LoginData, RegisterData } from "./types";

const baseUrl = "/auth";

export const getUser = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const response = await axios.get(`${baseUrl}/user`);

    dispatch(reduceGetUser(response.data));
  } catch (err) {
    console.log(err);
  }
};

export const register = (data: RegisterData) => async (dispatch: AppDispatch): Promise<void> => {
  const body = JSON.stringify(data);

  try {
    const response = await axios.post(`${baseUrl}/register`, body);

    dispatch(reduceGetUser(response.data));
  } catch (err) {
    console.log(err);
  }
};

export const login = (data: LoginData) => async (dispatch: AppDispatch): Promise<void> => {
  const body = JSON.stringify(data);

  try {
    const response = await axios.post(`${baseUrl}/login`, body);

    dispatch(reduceGetUser(response.data));
  } catch (err) {
    console.log(err);
  }
};
