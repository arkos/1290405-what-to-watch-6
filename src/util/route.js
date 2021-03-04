import {AppRoute} from './const';

export const getMovieUrl = (id = `:id`) => `${AppRoute.MOVIES}/${id}`;

export const getReviewUrl = (id = `:id`) => `${AppRoute.MOVIES}/review/${id}`;

export const getPlayerUrl = (id = `:id`) => `/player/${id}`;
