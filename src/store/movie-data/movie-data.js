import {createReducer} from '@reduxjs/toolkit';
import {loadMovies, reloadMovie, loadReviews} from '../action';

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

  builder.addCase(reloadMovie, (state, action) => {
    const index = state.movies.findIndex((movie) => movie.id === action.payload.movie.id);

    if (index === -1) {
      state.movies.splice(0, action.payload.movie);
      return;
    }

    state.movies.splice(index, 1, action.payload.movie);
  });
});

export {movieData};
