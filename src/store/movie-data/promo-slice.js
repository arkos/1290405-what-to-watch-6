import { createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../util/const";
import { fetchPromo } from "../api-actions";
import { SliceType } from "../slice";

const promoSlice = createSlice({
  name: SliceType.PROMO,
  initialState: {
    status: StateStatus.IDLE,
    promo: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPromo.pending, (state) => {
        state.status = StateStatus.LOADING;
      })
      .addCase(fetchPromo.fulfilled, (state, action) => {
        state.status = StateStatus.SUCCEEDED;
        state.promo = action.payload;
      })
      .addCase(fetchPromo.rejected, (state) => {
        state.status = StateStatus.FAILED;
      });
  },
});

export default promoSlice.reducer;
