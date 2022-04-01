import { movieProcess } from "./movie-process";
import { changeGenre } from "../action";
import {
  FILTER_ALL_GENRES,
  MOVIES_PER_PAGE,
  TabName,
  State,
} from "../../util/const";

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(movieProcess(undefined, {})).toEqual({
      selectedGenre: FILTER_ALL_GENRES,
      activeTab: TabName.OVERVIEW,
      renderedMoviesCount: MOVIES_PER_PAGE,
      dataProcessingState: State.DEFAULT,
    });
  });
  it(`Reducer should set a given genre and reset rendered movies`, () => {
    const state = { selectedGenre: `Drama` };
    expect(movieProcess(state, changeGenre(`Comedy`))).toEqual({
      selectedGenre: `Comedy`,
      renderedMoviesCount: MOVIES_PER_PAGE,
    });
  });
});
