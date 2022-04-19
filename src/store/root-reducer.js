import movieSlice from "./movie-slice/movie-slice";
import promoSlice from "./promo-slice/promo-slice";
import { movieProcess } from "./movie-process/movie-process";
import { user } from "./user/user";
import reviewSlice from "./review-slice/review-slice";

export const NameSpace = {
  MOVIES: `MOVIES`,
  MOVIE: `MOVIE`,
  PROMO: `PROMO`,
  USER: `USER`,
  REVIEWS: `REVIEWS`,
};

const rootReducer = {
  [NameSpace.MOVIES]: movieSlice,
  [NameSpace.PROMO]: promoSlice,
  [NameSpace.MOVIE]: movieProcess,
  [NameSpace.USER]: user,
  [NameSpace.REVIEWS]: reviewSlice,
};

export default rootReducer;
