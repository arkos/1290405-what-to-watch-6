import {createAction} from '@reduxjs/toolkit';


export const ActionType = {
  CHANGE_GENRE: `movies/changeGenre`,
  GET_MOVIES: `movies/getMovies`,
  LOAD_MOVIES: `data/loadMovies`,
  REQUIRE_AUTHORIZATION: `user/requiredAuthorization`,
  REDIRECT_TO_ROUTE: `user/redirectToRoute`
};

export const changeGenre = createAction(ActionType.CHANGE_GENRE, (genre) => {
  return {
    payload: genre
  };
});

export const getMovies = createAction(ActionType.GET_MOVIES);

export const loadMovies = createAction(ActionType.LOAD_MOVIES, (movies) => {
  return {
    payload: movies
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
