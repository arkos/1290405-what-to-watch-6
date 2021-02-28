export const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  MYLIST: `/mylist`,
  MOVIES: `/films`,
};

export const APIRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  MOVIES: `/films`
};

export const getMovieUrl = (id = `:id`) => `${AppRoute.MOVIES}/${id}`;

export const getReviewUrl = (id = `:id`) => `${AppRoute.MOVIES}/review/${id}`;

export const getPlayerUrl = (id = `:id`) => `/player/${id}`;
