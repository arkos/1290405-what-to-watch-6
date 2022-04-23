import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus, StateStatus } from "../../util/const";
import { checkAuth, login, logout } from "../api-actions";
import { SliceType } from "../slice";

const userSlice = createSlice({
  name: SliceType.USER,
  initialState: {
    user: null,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    status: StateStatus.IDLE,
  },
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = StateStatus.LOADING;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.status = StateStatus.SUCCEEDED;
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.status = StateStatus.FAILED;
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
      .addCase(login.pending, (state) => {
        state.status = StateStatus.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = StateStatus.SUCCEEDED;
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.AUTH;
      })
      .addCase(login.rejected, (state) => {
        state.status = StateStatus.FAILED;
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      });
  },
});

export default userSlice.reducer;
