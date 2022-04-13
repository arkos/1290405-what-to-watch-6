import movieData from "./movie-data/movie-slice";
import { movieProcess } from "./movie-process/movie-process";
import { user } from "./user/user";

export const NameSpace = {
  DATA: `DATA`,
  MOVIE: `MOVIE`,
  USER: `USER`,
};

const rootReducer = {
  [NameSpace.DATA]: movieData, // TODO: Rename to MOVIES to match the movies slice name
  [NameSpace.MOVIE]: movieProcess,
  [NameSpace.USER]: user,
};

export default rootReducer;
