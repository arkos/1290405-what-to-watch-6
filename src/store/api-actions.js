import {loadMovies, loadReviews, requireAuthorization, redirectToRoute} from '../store/action';
import {AuthorizationStatus} from '../util/const';
import {adaptToClient as adaptMovieToClient} from '../util/movie';
import {adaptToClient as adaptReviewToClient} from '../util/review';
import {APIRoute} from '../util/const';
import {getApiReviewsUrl} from '../util/route';

export const fetchMovies = () => (dispatch, _getState, api) => (
  api.get(APIRoute.MOVIES)
    .then(({data}) => dispatch(loadMovies(data.map(adaptMovieToClient))))
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
    .then(({data}) => dispatch(loadReviews(data.map(adaptReviewToClient), movieId)))
);
