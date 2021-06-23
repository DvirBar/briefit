import axios from "axios";
import { IUser, reduceGetUser } from "./slice";
import { AppDispatch } from "../store";
import { LoginData, RegisterData } from "./types";

const baseUrl = "/auth";

export const getUser = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const response: IUser = await axios.get(`${baseUrl}/user`);

    dispatch(reduceGetUser(response));
  } catch (err) {
    console.log(err);
  }
};

export const register = (data: RegisterData) => async (dispatch: AppDispatch): Promise<void> => {
  const body = JSON.stringify(data);

  try {
    const response: IUser = await axios.post(`${baseUrl}/user`, body);

    dispatch(reduceGetUser(response));
  } catch (err) {
    console.log(err);
  }
};

export const login = (data: LoginData) => async (dispatch: AppDispatch): Promise<void> => {
  const body = JSON.stringify(data);

  try {
    const response: IUser = await axios.post(`${baseUrl}/user`, body);

    dispatch(reduceGetUser(response));
  } catch (err) {
    console.log(err);
  }
};
