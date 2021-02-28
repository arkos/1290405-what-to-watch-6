import {ActionCreator} from '../store/action';
import {AuthorizationStatus} from '../const';
import {adaptToClient} from '../util';

export const fetchMovies = () => (dispatch, _getState, api) => {
  api.get(`/films`)
    .then(({data}) => dispatch(ActionCreator.loadMovies(data.map(adaptToClient))));
};

export const checkAuth = () => (dispatch, _getState, api) => {
  api.get(`/login`)
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)))
    .catch(() => {});
};

export const login = ({login: email, password}) => (dispatch, _getState, api) => {
  api.post(`/login`, {email, password})
    .then(() => dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)));
};
