import {createReducer} from '@reduxjs/toolkit';
import {loadMovies, reloadMovie, loadReviews, loadFavorites, saveReview, addFavorite, loadPromo} from '../action';

const initialState = {
  movies: [],
  isDataLoaded: false,
};

const movieData = createReducer(initialState, (builder) => {
  builder.addCase(loadMovies, (state, action) => {
    state.movies = action.payload;
    state.isDataLoaded = true;
  });

  builder.addCase(loadReviews, (state, action) => {
    const movieToFind = state.movies.find((movie) => movie.id === action.payload.movieId);
    movieToFind.reviews = action.payload.reviews;
  });

  builder.addCase(reloadMovie, (state, action) => {
    if (action.payload === null) {
      return;
    }

    const index = state.movies.findIndex((movie) => movie.id === action.payload.id);

    if (index === -1) {
      state.movies.push(action.payload);
      return;
    }

    state.movies.splice(index, 1, action.payload);
  });

  builder.addCase(saveReview, (state, action) => {
    const {movieId, review} = action.payload;

    const index = state.movies.findIndex((movie) => movie.id === movieId);

    if (index === -1) {
      return;
    }

    state.movies[index].reviews.push(review);
  });

  builder.addCase(addFavorite, (state, action) => {
    const movie = action.payload;

    const index = state.movies.findIndex((item) => item.id === movie.id);

    if (index === -1) {
      return;
    }

    state.movies[index].isFavorite = movie.isFavorite;
  });

  builder.addCase(loadFavorites, (state, action) => {
    const favorites = action.payload;

    if (state.movies.length === 0) {
      state.movies = favorites;
      return;
    }

    for (const movie of state.movies) {
      const isFavorite = favorites.some((favorite) => favorite.id === movie.id);
      movie.isFavorite = isFavorite;
    }
  });

  builder.addCase(loadPromo, (state, action) => {
    state.movies = state.movies.map((movie) =>
      Object.assign(movie, {isPromo: action.payload.id === movie.id}));
  });
});

export {movieData};
