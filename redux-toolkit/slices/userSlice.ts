import { userData } from "@/types/common.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { destroyCookie } from "nookies";
import { userSliceData } from "../interfaces/interfaces";
import axiosInstance from "@/api/axiosInstance";
import { endpoints } from "@/api/endpoints";

const initialState: userSliceData = {
  isLoggedIn: false,
  userData: null
};

export const loginUser = createAsyncThunk(
  "/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(
        endpoints.auth.login,
        data
      );
      return res
    } catch (error) {
      return rejectWithValue([]);
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setLoginData: (state, { payload }: { payload: userData }) => {
      // state.email
      state.userData = payload;
      state.isLoggedIn = true;
    },
    checkLoggedInServer: (state, { payload }) => {
      state.isLoggedIn = payload?.hasToken;
      state.userData = payload?.user;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      destroyCookie(null, "token");
      destroyCookie(null, "user");
    }
  },
  extraReducers: {}
});

export const { setLoginData, checkLoggedInServer, logout } = userSlice.actions;

export default userSlice.reducer;
