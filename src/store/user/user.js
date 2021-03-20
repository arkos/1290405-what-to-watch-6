import {createReducer} from "@reduxjs/toolkit";
import {AuthorizationStatus} from "../../util/const";
import {requireAuthorization} from "../action";

const initialState = {
  id: null,
  email: null,
  name: null,
  avatarUrl: null,
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    state.authorizationStatus = action.payload;
  });
});

export {user};
