import {createReducer} from '@reduxjs/toolkit';
import {loadMovies, changeGenre, requireAuthorization} from '../store/action';
import {AuthorizationStatus, FILTER_ALL_GENRES} from '../const';

const initialState = {
  selectedGenre: FILTER_ALL_GENRES,
  movies: [],
  userMovies: [],
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(loadMovies, (state, action) => {
    state.movies = action.payload;
    state.isDataLoaded = true;
  });
  builder.addCase(changeGenre, (state, action) => {
    state.selectedGenre = action.payload;
  });
  builder.addCase(requireAuthorization, (state, action) => {
    state.authorizationStatus = action.payload;
  });
});

export {reducer};
