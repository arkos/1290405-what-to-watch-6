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

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  getMovies: () => ({
    type: ActionType.GET_MOVIES
  }),
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRE_AUTHORIZATION,
    payload: status
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url
  })
};
