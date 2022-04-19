import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus } from "../../util/const";
import { SliceType } from "../slice";

const userSlice = createSlice({
  name: SliceType.USER,
  initialState: {
    user: null,
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  },
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export default userSlice.reducer;
