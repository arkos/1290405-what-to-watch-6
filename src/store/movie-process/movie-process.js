import { createReducer } from "@reduxjs/toolkit";
import {
  FILTER_ALL_GENRES,
  MOVIES_PER_PAGE,
  TabName,
  State,
} from "../../util/const";
import {
  changeGenre,
  changeActiveTab,
  changeCountToRender,
  resetMain,
  changeDataProcessingState,
} from "../action";

const initialState = {
  selectedGenre: FILTER_ALL_GENRES,
  activeTab: TabName.OVERVIEW,
  renderedMoviesCount: MOVIES_PER_PAGE,
  dataProcessingState: State.DEFAULT,
};

const movieProcess = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.selectedGenre = action.payload;
    state.renderedMoviesCount = MOVIES_PER_PAGE;
  });

  builder.addCase(changeActiveTab, (state, action) => {
    state.activeTab = action.payload;
  });

  builder.addCase(changeCountToRender, (state, action) => {
    state.renderedMoviesCount = action.payload;
  });

  builder.addCase(resetMain, (state) => {
    state.selectedGenre = initialState.selectedGenre;
    state.renderedMoviesCount = initialState.renderedMoviesCount;
  });

  builder.addCase(changeDataProcessingState, (state, action) => {
    state.dataProcessingState = action.payload;
  });
});

export { movieProcess };
