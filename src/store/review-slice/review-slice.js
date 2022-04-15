import { createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../util/const";
import { fetchReviews } from "../api-actions";
import { SliceType } from "../slice";

const reviewSlice = createSlice({
  name: SliceType.REVIEWS,
  initialState: {
    data: [],
    status: StateStatus.LOADING,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = StateStatus.LOADING;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = StateStatus.SUCCEEDED;
        const index = state.data.findIndex(
          (item) => item.movieId === action.payload.movieId
        );
        if (~index) {
          state.data.splice(index, 1, action.payload);
        } else {
          state.data.push(action.payload);
        }
      })
      .addCase(fetchReviews.rejected, (state) => {
        state.status = StateStatus.FAILED;
      });
  },
});

export default reviewSlice.reducer;
