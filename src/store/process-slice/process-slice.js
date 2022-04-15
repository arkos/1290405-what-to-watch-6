import { createSlice } from "@reduxjs/toolkit";
import {
  FILTER_ALL_GENRES,
  MOVIES_PER_PAGE,
  StateStatus,
  TabName,
} from "../../util/const";

const processSlice = createSlice({
  initialState: {
    selectedGenre: FILTER_ALL_GENRES,
    activeTab: TabName.OVERVIEW,
    renderedMoviesCount: MOVIES_PER_PAGE,
    status: StateStatus.IDLE,
  },
  reducers: {
    changeGenre: (state, action) => {
      state.selectedGenre = action.payload;
      state.renderedMoviesCount = MOVIES_PER_PAGE;
    },
    changeActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    changeCountToRender: (state, action) => {
      state.renderedMoviesCount = action.payload;
    },
    resetMain: (state) => {
      state.selectedGenre = FILTER_ALL_GENRES;
      state.renderedMoviesCount = MOVIES_PER_PAGE;
    },
  },
});

export default processSlice.reducer;
