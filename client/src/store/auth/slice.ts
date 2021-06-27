import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  isPremium: boolean;
  dataCreated: Date;
}

interface UpdateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
}

interface UserSlice {
  isAuthentication: boolean;
  user: IUser | null;
}

const initialState: UserSlice = {
  isAuthentication: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reduceGetUser: (state: UserSlice, action: PayloadAction<IUser>) => {
      state.isAuthentication = true;
      state.user = action.payload;
    },
    reduceUpdateUser: (state: UserSlice, action: PayloadAction<UpdateUserPayload>) => {
      Object.assign(state.user, action.payload);
    },
    logout: (state: UserSlice) => {
      state.isAuthentication = false;
      state.user = null;
    },
  },
});

export const { reduceGetUser, reduceUpdateUser, logout } = authSlice.actions;

export default authSlice.reducer;
