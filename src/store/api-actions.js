import {
  loadReviews,
  requireAuthorization,
  redirectToRoute,
  reloadMovie,
  changeDataProcessingState,
  saveReview,
  addFavorite,
  loadFavorites,
  loadUser,
  ActionType,
} from "../store/action";

import { AppRoute, AuthorizationStatus, State } from "../util/const";
import { adaptToClient as adaptMovieToClient } from "../util/movie";
import { adaptToClient as adaptUserToClient } from "../util/user";
import { APIRoute } from "../util/const";

import {
  getApiMovieUrl,
  getApiReviewsUrl,
  getMovieUrl,
  getApiFavoriteUrl,
  getPromoMovieUrl,
} from "../util/route";
import { createAsyncThunk } from "@reduxjs/toolkit";

// TODO: Remove authorization from fetch movies
// TODO: Use entity adapter for store slices
// TODO: Use separate entity/slice for promo
// TODO: loadMovies functionality should be moved to fetchMovies

export const fetchMovies = createAsyncThunk(
  ActionType.FETCH_MOVIES,
  async (_, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get(APIRoute.MOVIES);
      return data.map(adaptMovieToClient);
    } catch (err) {
      console.log(`Failed to fetch movies: `, err);
    }
  }
);

export const checkAuth = () => (dispatch, _getState, api) => {
  dispatch(requireAuthorization(AuthorizationStatus.UNKNOWN));
  return api
    .get(APIRoute.LOGIN)
    .then(({ data: user }) => dispatch(loadUser(adaptUserToClient(user))))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)));
};

export const login =
  ({ login: email, password }) =>
  (dispatch, _getState, api) => {
    dispatch(requireAuthorization(AuthorizationStatus.UNKNOWN));
    return api
      .post(APIRoute.LOGIN, { email, password })
      .then(({ data: user }) => dispatch(loadUser(adaptUserToClient(user))))
      .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
      .then(() => dispatch(redirectToRoute(APIRoute.ROOT)))
      .catch(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)));
  };

export const logout = () => (dispatch, _getState, api) =>
  api
    .get(APIRoute.LOGOUT)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)))
    .then(() => dispatch(loadUser(null)))
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)));

export const fetchReviews =
  ({ id: movieId }) =>
  (dispatch, _getState, api) =>
    api
      .get(getApiReviewsUrl(movieId))
      .then(({ data }) => dispatch(loadReviews(data, movieId)));

export const fetchMovie = (id) => (dispatch, _getState, api) =>
  api
    .get(getApiMovieUrl(id))
    .then(({ data }) => dispatch(reloadMovie(adaptMovieToClient(data))))
    .catch(() => dispatch(redirectToRoute(`/not-found`)));

export const fetchPromo = createAsyncThunk(
  ActionType.FETCH_PROMO,
  async (_, { dispatch, extra: api }) => {
    try {
      const { data: promo } = await api.get(getPromoMovieUrl());
      return adaptMovieToClient(promo);
    } catch (err) {
      console.log(`Failed fetching promo: `, err);
    }
  }
);

export const postReview =
  ({ rating, comment }, movieId) =>
  (dispatch, _getState, api) => {
    dispatch(changeDataProcessingState(State.SAVING));
    return api
      .post(getApiReviewsUrl(movieId), { rating, comment })
      .then(({ data }) => dispatch(saveReview({ review: data, movieId })))
      .then(() => dispatch(changeDataProcessingState(State.DEFAULT)))
      .then(() => dispatch(redirectToRoute(getMovieUrl(movieId))))
      .catch(() => dispatch(changeDataProcessingState(State.ABORTING)));
  };

export const postFavorite = (id, status) => (dispatch, _getState, api) =>
  api
    .post(getApiFavoriteUrl(id, status))
    .then(({ data }) => dispatch(addFavorite(adaptMovieToClient(data))));

export const fetchFavorites = () => (dispatch, _getState, api) => {
  dispatch(changeDataProcessingState(State.SAVING));
  return api
    .get(APIRoute.FAVORITE)
    .then(({ data }) => dispatch(loadFavorites(data.map(adaptMovieToClient))))
    .then(() => dispatch(changeDataProcessingState(State.DEFAULT)))
    .catch(() => dispatch(changeDataProcessingState(State.ABORTING)));
};
