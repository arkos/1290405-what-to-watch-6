export const FILTER_ALL_GENRES = `All genres`;

export const MAX_MOVIES_MORE_LIKE_THIS = 4;

export const MAX_GENRES_COUNT = 10;

export const MOVIES_PER_PAGE = 8;

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
  UNKNOWN: `UNKNOWN`
};

export const APIRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  LOGOUT: `logout`,
  MOVIES: `/films`,
  REVIEWS: `/comments`,
  FAVORITE: `/favorite`
};

export const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  LOGOUT: `/logout`,
  MYLIST: `/mylist`,
  MOVIES: `/films`,
};

export const Rating = {
  BAD: 3,
  NORMAL: 5,
  GOOD: 8,
  VERYGOOD: 10,
  AWESOME: Infinity
};

export const TabName = {
  OVERVIEW: `OVERVIEW`,
  DETAILS: `DETAILS`,
  REVIEWS: `REVIEWS`
};

export const State = {
  SAVING: `SAVING`,
  ABORTING: `ABORTING`,
  DEFAULT: `DEFAULT`
};

export const FavoriteStatus = {
  NOT_FAVORITE: 0,
  FAVORITE: 1
};
