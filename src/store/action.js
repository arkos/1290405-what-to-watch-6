import {createAction} from '@reduxjs/toolkit';


export const ActionType = {
  CHANGE_GENRE: `movies/changeGenre`,
  LOAD_MOVIES: `data/loadMovies`,
  RELOAD_MOVIE: `data/reloadMovie`,
  LOAD_REVIEWS: `data/loadReviews`,
  REQUIRE_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `user/redirectToRoute`
};

export const changeGenre = createAction(ActionType.CHANGE_GENRE, (genre) => {
  return {
    payload: genre
  };
});

export const loadMovies = createAction(ActionType.LOAD_MOVIES, (movies) => {
  return {
    payload: movies
  };
});

export const reloadMovie = createAction(ActionType.RELOAD_MOVIE, (movie) => {
  return {
    payload: movie
  };
});

export const loadReviews = createAction(ActionType.LOAD_REVIEWS, (reviews, movieId) => {
  return {
    payload: {
      reviews,
      movieId
    }
  };
});

export const requireAuthorization = createAction(ActionType.REQUIRE_AUTHORIZATION, (status) => {
  return {
    payload: status
  };
});

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (url) => {
  return {
    payload: url
  };
});
