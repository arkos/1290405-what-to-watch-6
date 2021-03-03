import {combineReducers} from "@reduxjs/toolkit";
import {movieData} from "./store/movie-data/movie-data";
import {movieProcess} from './store/movie-process/movie-process';
import {user} from "./store/user/user";

export const NameSpace = {
  DATA: `DATA`,
  MOVIE: `MOVIE`,
  USER: `USER`
};

export default combineReducers({
  [NameSpace.DATA]: movieData,
  [NameSpace.MOVIE]: movieProcess,
  [NameSpace.USER]: user
});
