import {createReducer} from "@reduxjs/toolkit";
import {FILTER_ALL_GENRES} from "../../util/const";
import {changeGenre} from "../action";

const initialState = {
  selectedGenre: FILTER_ALL_GENRES
};

const movieProcess = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.selectedGenre = action.payload;
  });
});

export {movieProcess};
