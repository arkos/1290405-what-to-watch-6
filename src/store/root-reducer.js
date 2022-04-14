import movieData from "./movie-data/movie-slice";
import promoSlice from "./movie-data/promo-slice";
import { movieProcess } from "./movie-process/movie-process";
import { user } from "./user/user";

export const NameSpace = {
  DATA: `DATA`,
  MOVIE: `MOVIE`,
  PROMO: `PROMO`,
  USER: `USER`,
};

const rootReducer = {
  [NameSpace.DATA]: movieData, // TODO: Rename to MOVIES to match the movies slice name
  [NameSpace.PROMO]: promoSlice,
  [NameSpace.MOVIE]: movieProcess,
  [NameSpace.USER]: user,
};

export default rootReducer;
