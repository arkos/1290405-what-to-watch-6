import {createReducer} from "@reduxjs/toolkit";
import {FILTER_ALL_GENRES, TabName} from "../../util/const";
import {changeGenre, changeActiveTab} from "../action";

const initialState = {
  selectedGenre: FILTER_ALL_GENRES,
  activeTab: TabName.OVERVIEW
};

const movieProcess = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.selectedGenre = action.payload;
  });

  builder.addCase(changeActiveTab, (state, action) => {
    state.activeTab = action.payload;
  });
});

export {movieProcess};
