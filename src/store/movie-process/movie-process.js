import {createReducer} from "@reduxjs/toolkit";
import {FILTER_ALL_GENRES, MOVIES_PER_PAGE, TabName} from "../../util/const";
import {changeGenre, changeActiveTab} from "../action";

const initialState = {
  selectedGenre: FILTER_ALL_GENRES,
  activeTab: TabName.OVERVIEW,
  renderedMoviesCount: MOVIES_PER_PAGE
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
