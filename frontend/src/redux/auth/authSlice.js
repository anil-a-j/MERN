import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signupService, loginService, logoutService } from "./authServices";

const user = JSON.parse(localStorage.getItem("userInfo"));

const initialState = {
  userInfo: user ? user : null,
  userStatus: "",
  userError: "",
};

export const signup = createAsyncThunk("auth/signup", async (data) => {
  return await signupService(data);
});

export const login = createAsyncThunk("auth/login", async (data) => {
  return await loginService(data);
});

export const logout = createAsyncThunk("auth/logout", async () => {
  return await logoutService();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.userInfo = "";
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state, action) => {
        state.userStatus = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.userStatus = "";
      })
      .addCase(signup.rejected, (state, action) => {
        state.userStatus = "failed";
        state.userError = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.userStatus = "";
        state.userError = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.userError = action.error.message;
        state.userStatus = "failed";
      })
      .addCase(logout.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.userStatus = "";
      })
      .addCase(logout.rejected, (state, action) => {
        state.userStatus = "failed";
        state.userError = action.error.message;
      });
  },
});

export const selectAuth = (state) => state.auth;

export const { reset } = authSlice.actions;

export default authSlice.reducer;
