import {createReducer} from '@reduxjs/toolkit';
import {loadMovies} from '../action';

const initialState = {
  movies: [],
  userMovies: [],
  isDataLoaded: false
};

const movieData = createReducer(initialState, (builder) => {
  builder.addCase(loadMovies, (state, action) => {
    state.movies = action.payload;
    state.isDataLoaded = true;
  });
});

export {movieData};
