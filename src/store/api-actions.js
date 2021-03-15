import {loadMovies, loadReviews, requireAuthorization, redirectToRoute, reloadMovie} from '../store/action';
import {AuthorizationStatus} from '../util/const';
import {adaptToClient} from '../util/movie';
import {APIRoute} from '../util/const';
import {getApiMovieUrl, getApiReviewsUrl, getMovieUrl} from '../util/route';

export const fetchMovies = () => (dispatch, _getState, api) => (
  api.get(APIRoute.MOVIES)
    .then(({data}) => dispatch(loadMovies(data.map(adaptToClient))))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(APIRoute.ROOT)))
);

export const fetchReviews = ({id: movieId}) => (dispatch, _getState, api) => (
  api.get(getApiReviewsUrl(movieId))
    .then(({data}) => dispatch(loadReviews(data, movieId)))
);

export const fetchMovie = (id) => (dispatch, _getState, api) => (
  api.get(getApiMovieUrl(id))
    .then(({data}) => dispatch(reloadMovie(adaptToClient(data))))
    .catch(() => dispatch(redirectToRoute(`/not-found`)))
);

export const postReview = ({rating, comment}, movieId) => (dispatch, _getState, api) => (
  api.post(getApiReviewsUrl(movieId), {rating, comment})
    .then(() => dispatch(redirectToRoute(getMovieUrl(movieId))))
    .catch(() => {})
);
