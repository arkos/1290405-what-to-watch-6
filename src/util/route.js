import {AppRoute, APIRoute} from './const';

export const getMovieUrl = (id = `:id`) => `${AppRoute.MOVIES}/${id}`;

export const getReviewUrl = (id = `:id`) => `${AppRoute.MOVIES}/${id}/review`;

export const getPlayerUrl = (id = `:id`) => `/player/${id}`;

export const getApiReviewsUrl = (id) => `${APIRoute.REVIEWS}/${id}`;

export const getApiMovieUrl = (id) => `${APIRoute.MOVIES}/${id}`;

export const getApiFavoriteUrl = (id, status) => `${APIRoute.FAVORITE}/${id}/${status}`;
