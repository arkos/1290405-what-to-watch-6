import { createAction } from "@reduxjs/toolkit";
import { SliceType } from "./slice";

export const ActionType = {
  CHANGE_GENRE: `movies/changeGenre`,
  CHANGE_ACTIVE_TAB: `movies/changeActiveTab`,
  CHANGE_COUNT_TO_RENDER: `movies/changeCountToRender`,
  RESET_MAIN: `movies/resetMain`,
  CHANGE_DATA_PROCESSING_STATE: `movies/changeDataProcessingState`,

  ADD_FAVORITE: `data/addFavorite`,
  LOAD_FAVORITES: `data/loadFavorites`,

  REDIRECT_TO_ROUTE: `user/redirectToRoute`,

  FETCH_MOVIES: `${SliceType.MOVIES}/fetchMovies`,
  FETCH_PROMO: `${SliceType.PROMO}/fetchPromo`,

  FETCH_REVIEWS: `${SliceType.REVIEWS}/fetchReviews`,
  POST_REVIEW: `${SliceType.REVIEWS}/postReview`,
  LOAD_REVIEWS: `data/loadReviews`,
  SAVE_REVIEW: `data/saveReview`,

  REQUIRE_AUTHORIZATION: `user/requiredAuthorization`,
  CHECK_AUTH: `${SliceType.USER}/checkAuth`,
  LOGIN: `${SliceType.USER}/login`,
  LOGOUT: `${SliceType.USER}/logout`,
};

export const changeGenre = createAction(ActionType.CHANGE_GENRE, (genre) => {
  return {
    payload: genre,
  };
});

export const changeActiveTab = createAction(
  ActionType.CHANGE_ACTIVE_TAB,
  (tab) => {
    return {
      payload: tab,
    };
  }
);

export const changeCountToRender = createAction(
  ActionType.CHANGE_COUNT_TO_RENDER,
  (count) => {
    return {
      payload: count,
    };
  }
);

export const resetMain = createAction(ActionType.RESET_MAIN, () => ({}));

export const changeDataProcessingState = createAction(
  ActionType.CHANGE_DATA_PROCESSING_STATE,
  (processingState) => {
    return {
      payload: processingState,
    };
  }
);

export const loadReviews = createAction(
  ActionType.LOAD_REVIEWS,
  (reviews, movieId) => {
    return {
      payload: {
        reviews,
        movieId,
      },
    };
  }
);

export const loadFavorites = createAction(
  ActionType.LOAD_FAVORITES,
  (favorites) => {
    return {
      payload: favorites,
    };
  }
);

export const saveReview = createAction(
  ActionType.SAVE_REVIEW,
  (review, movieId) => {
    return {
      payload: {
        review,
        movieId,
      },
    };
  }
);

export const addFavorite = createAction(ActionType.ADD_FAVORITE, (movie) => {
  return {
    payload: movie,
  };
});

export const loadUser = createAction(ActionType.LOAD_USER, (user) => {
  return {
    payload: user,
  };
});

export const requireAuthorization = createAction(
  ActionType.REQUIRE_AUTHORIZATION,
  (status) => {
    return {
      payload: status,
    };
  }
);

export const redirectToRoute = createAction(
  ActionType.REDIRECT_TO_ROUTE,
  (url) => {
    return {
      payload: url,
    };
  }
);
