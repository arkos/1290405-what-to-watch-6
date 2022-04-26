import {
  redirectToRoute,
  changeDataProcessingState,
  addFavorite,
  loadFavorites,
  ActionType,
} from "../store/action";

import { AppRoute, State } from "../util/const";
import { adaptToClient as adaptMovieToClient } from "../util/movie";
import { adaptToClient as adaptUserToClient } from "../util/user";
import { APIRoute } from "../util/const";

import {
  getApiReviewsUrl,
  getMovieUrl,
  getApiFavoriteUrl,
  getPromoMovieUrl,
} from "../util/route";
import { createAsyncThunk } from "@reduxjs/toolkit";

// TODO: Use entity adapter for store slices
// TODO: Remove redundant stores after implementing all slices
// TODO: Fix all tests

// USER

export const checkAuth = createAsyncThunk(
  ActionType.CHECK_AUTH,
  async (_, { dispatch: _dispatch, extra: api }) => {
    const { data } = await api.get(APIRoute.LOGIN);
    return adaptUserToClient(data);
  }
);

export const login = createAsyncThunk(
  ActionType.LOGIN,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: user } = await api.post(APIRoute.LOGIN, { email, password });
    dispatch(redirectToRoute(APIRoute.ROOT));
    return adaptUserToClient(user);
  }
);

export const logout = createAsyncThunk(
  ActionType.LOGOUT,
  async (_, { dispatch, extra: api }) => {
    await api.get(APIRoute.LOGOUT);
    dispatch(redirectToRoute(AppRoute.ROOT));
  }
);

// MOVIES

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

// PROMO

export const fetchPromo = createAsyncThunk(
  ActionType.FETCH_PROMO,
  async (_, { dispatch: _dispatch, extra: api }) => {
    try {
      const { data: promo } = await api.get(getPromoMovieUrl());
      return adaptMovieToClient(promo);
    } catch (err) {
      console.log(`Failed fetching promo: `, err);
    }
  }
);

// REVIEWS

export const fetchReviews = createAsyncThunk(
  ActionType.FETCH_REVIEWS,
  async ({ id: movieId }, { dispatch: _dispatch, extra: api }) => {
    try {
      const { data } = await api.get(getApiReviewsUrl(movieId));
      return {
        reviews: data,
        movieId,
      };
    } catch (err) {
      console.log(`Failed to fetch reviews: `, err);
    }
  }
);

export const postReview = createAsyncThunk(
  ActionType.POST_REVIEW,
  async ({ commentInfo, movieId }, { dispatch, extra: api }) => {
    const { rating, comment } = commentInfo;
    const { data: reviews } = await api.post(getApiReviewsUrl(movieId), {
      rating,
      comment,
    });
    dispatch(redirectToRoute(getMovieUrl(movieId)));
    return { reviews, movieId };
  }
);

// FAVORITES

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
