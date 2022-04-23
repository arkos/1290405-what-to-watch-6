import { createSlice } from "@reduxjs/toolkit";
import { StateStatus } from "../../util/const";
import { fetchMovies } from "../api-actions";
import { SliceType } from "../slice";

const moviesSlice = createSlice({
  name: SliceType.MOVIES,
  initialState: {
    movies: [],
    status: StateStatus.LOADING,
  },
  reducers: {
    loadReviews: (state, action) => {
      const movieToFind = state.movies.find(
        (movie) => movie.id === action.payload.movieId
      );
      if (movieToFind) {
        movieToFind.reviews = action.payload.reviews;
      }
    },
    reloadMovie: (state, action) => {
      if (action.payload === null) {
        return;
      }

      const index = state.movies.findIndex(
        (movie) => movie.id === action.payload.id
      );

      if (index === -1) {
        state.movies.push(action.payload);
        return;
      }

      state.movies.splice(index, 1, action.payload);
    },
    saveReview: (state, action) => {
      const { movieId, review } = action.payload;

      const index = state.movies.findIndex((movie) => movie.id === movieId);

      if (index === -1) {
        return;
      }

      state.movies[index].reviews.push(review);
    },
    addFavorite: (state, action) => {
      const movie = action.payload;

      const index = state.movies.findIndex((item) => item.id === movie.id);

      if (index === -1) {
        return;
      }

      state.movies[index].isFavorite = movie.isFavorite;
    },
    loadFavorites: (state, action) => {
      const favorites = action.payload;

      if (state.movies.length === 0) {
        state.movies = favorites;
        return;
      }

      for (const movie of state.movies) {
        const isFavorite = favorites.some(
          (favorite) => favorite.id === movie.id
        );
        movie.isFavorite = isFavorite;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = StateStatus.LOADING;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = StateStatus.SUCCEEDED;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = StateStatus.FAILED;
      });
  },
});

export default moviesSlice.reducer;
