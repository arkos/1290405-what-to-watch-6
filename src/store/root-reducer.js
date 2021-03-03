import {movieData} from "./movie-data/movie-data";
import {movieProcess} from './movie-process/movie-process';
import {user} from "./user/user";

export const NameSpace = {
  DATA: `DATA`,
  MOVIE: `MOVIE`,
  USER: `USER`
};

export default {
  [NameSpace.DATA]: movieData,
  [NameSpace.MOVIE]: movieProcess,
  [NameSpace.USER]: user
};
