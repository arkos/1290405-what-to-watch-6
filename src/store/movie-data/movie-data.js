import {createReducer} from '@reduxjs/toolkit';
import {loadMovies, loadReviews} from '../action';

const initialState = {
  movies: [],
  userMovies: [],
  isDataLoaded: false,
  reviewsLoaded: []
};

const movieData = createReducer(initialState, (builder) => {
  builder.addCase(loadMovies, (state, action) => {
    state.movies = action.payload;
    state.isDataLoaded = true;
  });

  builder.addCase(loadReviews, (state, action) => {
    const movieToFind = state.movies.find((movie) => movie.id === action.payload.movieId);
    movieToFind.reviews = action.payload.reviews;
    state.reviewsLoaded.push(action.payload.movieId);
  });
});

export {movieData};
