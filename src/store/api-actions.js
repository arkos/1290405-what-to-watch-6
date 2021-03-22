import {
  loadMovies,
  loadReviews,
  requireAuthorization,
  redirectToRoute,
  reloadMovie,
  changeDataProcessingState,
  saveReview,
  addFavorite,
  loadFavorites,
  loadUser,
  loadPromo
} from '../store/action';

import {AppRoute, AuthorizationStatus, State} from '../util/const';
import {adaptToClient as adaptMovieToClient} from '../util/movie';
import {adaptToClient as adaptUserToClient} from '../util/user';
import {APIRoute} from '../util/const';

import {
  getApiMovieUrl,
  getApiReviewsUrl,
  getMovieUrl,
  getApiFavoriteUrl,
  getPromoMovieUrl
} from '../util/route';

export const fetchMovies = () => (dispatch, _getState, api) => {
  return api.get(APIRoute.MOVIES)
    .then(({data}) => dispatch(loadMovies(data.map(adaptMovieToClient))))
    .then(() => dispatch(fetchPromo()))
    .catch(() => {});
};

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data: user}) => dispatch(loadUser(adaptUserToClient(user))))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data: user}) => dispatch(loadUser(adaptUserToClient(user))))
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(APIRoute.ROOT)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGOUT)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH)))
    .then(() => dispatch(loadUser(null)))
    .then(() => dispatch(redirectToRoute(AppRoute.ROOT)))
);

export const fetchReviews = ({id: movieId}) => (dispatch, _getState, api) => (
  api.get(getApiReviewsUrl(movieId))
    .then(({data}) => dispatch(loadReviews(data, movieId)))
);

export const fetchMovie = (id) => (dispatch, _getState, api) => (
  api.get(getApiMovieUrl(id))
    .then(({data}) => dispatch(reloadMovie(adaptMovieToClient(data))))
    .catch(() => dispatch(redirectToRoute(`/not-found`)))
);

export const fetchPromo = () => (dispatch, _getState, api) => {
  return api.get(getPromoMovieUrl())
    .then(({data: promo}) => dispatch(loadPromo(adaptMovieToClient(promo))))
    .catch(() => {});
};

export const postReview = ({rating, comment}, movieId) => (dispatch, _getState, api) => {
  dispatch(changeDataProcessingState(State.SAVING));
  return api.post(getApiReviewsUrl(movieId), {rating, comment})
    .then(({data}) => dispatch(saveReview({review: data, movieId})))
    .then(() => dispatch(changeDataProcessingState(State.DEFAULT)))
    .then(() => dispatch(redirectToRoute(getMovieUrl(movieId))))
    .catch(() => dispatch(changeDataProcessingState(State.ABORTING)));
};

export const postFavorite = (id, status) => (dispatch, _getState, api) => (
  api.post(getApiFavoriteUrl(id, status))
    .then(({data}) => dispatch(addFavorite(adaptMovieToClient(data))))
);

export const fetchFavorites = () => (dispatch, _getState, api) => {
  dispatch(changeDataProcessingState(State.SAVING));
  return api.get(APIRoute.FAVORITE)
    .then(({data}) => dispatch(loadFavorites(data.map(adaptMovieToClient))))
    .then(() => dispatch(changeDataProcessingState(State.DEFAULT)))
    .catch(() => dispatch(changeDataProcessingState(State.ABORTING)));
};
