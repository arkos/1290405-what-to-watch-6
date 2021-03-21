import {createReducer} from "@reduxjs/toolkit";
import {AuthorizationStatus} from "../../util/const";
import {requireAuthorization, loadUser} from "../action";

const initialState = {
  user: null,
  authorizationStatus: AuthorizationStatus.NO_AUTH
};

const user = createReducer(initialState, (builder) => {
  builder.addCase(requireAuthorization, (state, action) => {
    state.authorizationStatus = action.payload;
  });

  builder.addCase(loadUser, (state, action) => {
    state.user = action.payload;
  });
});

export {user};
