import {createAction} from '@reduxjs/toolkit';


export const ActionType = {
  CHANGE_GENRE: `movies/changeGenre`,
  CHANGE_ACTIVE_TAB: `movies/changeActiveTab`,
  CHANGE_COUNT_TO_RENDER: `movies/changeCountToRender`,
  RESET_MAIN: `movies/resetMain`,
  LOAD_MOVIES: `data/loadMovies`,
  RELOAD_MOVIE: `data/reloadMovie`,
  LOAD_REVIEWS: `data/loadReviews`,
  POST_REVIEW: `data/postReview`,
  REQUIRE_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `user/redirectToRoute`
};

export const changeGenre = createAction(ActionType.CHANGE_GENRE, (genre) => {
  return {
    payload: genre
  };
});

export const changeActiveTab = createAction(ActionType.CHANGE_ACTIVE_TAB, (tab) => {
  return {
    payload: tab
  };
});

export const changeCountToRender = createAction(ActionType.CHANGE_COUNT_TO_RENDER, (count) => {
  return {
    payload: count
  };
});

export const resetMain = createAction(ActionType.RESET_MAIN, () => ({}));

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

export const postReview = createAction(ActionType.POST_REVIEW, (review) => {
  return {
    payload: review
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
