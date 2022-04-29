import { createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../util/const";
import { fetchReviews, postReview } from "../api-actions";
import { SliceType } from "../slice";

const reviewSlice = createSlice({
  name: SliceType.REVIEWS,
  initialState: {
    data: [],
    status: StateStatus.IDLE,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = StateStatus.WORKING;
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
      })
      .addCase(postReview.pending, (state) => {
        state.status = StateStatus.WORKING;
      })
      .addCase(postReview.fulfilled, (state, action) => {
        state.status = StateStatus.SUCCEEDED;

        const index = state.data.findIndex(
          (item) => item.movieId === action.payload.movieId
        );

        if (~index) {
          state.data[index] = action.payload;
        }
      })
      .addCase(postReview.rejected, (state) => {
        state.status = StateStatus.FAILED;
      });
  },
});

export default reviewSlice.reducer;
