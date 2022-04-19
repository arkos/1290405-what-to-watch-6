import { createSelector } from "reselect";
import { filterByGenre } from "../../util/genre";

const moviesSelector = ({ MOVIES }) => MOVIES.movies;
const genreSelector = ({ MOVIE }) => MOVIE.selectedGenre;
const promoSelector = ({ PROMO }) => PROMO.promo;
const reviewsSelector = ({ REVIEWS }) => REVIEWS.data;
const reviewsStatusSelector = ({ REVIEWS }) => REVIEWS.status;

export const getFilteredMovies = createSelector(
  [moviesSelector, genreSelector],
  (movies, genre) => filterByGenre(movies, genre)
);

export const getAllMovies = createSelector(moviesSelector, (movies) => movies);

export const getFavoriteMovies = createSelector(moviesSelector, (movies) => {
  return movies.filter((movie) => movie.isFavorite);
});

export const getPromoMovie = createSelector(promoSelector, (promo) => promo);

export const getReviewsForMovie = createSelector(
  reviewsSelector,
  (_state, movieId) => movieId,
  (data, movieId) => {
    const findItem = data.find((item) => item.movieId === movieId);
    return findItem && findItem.reviews;
  }
);

export const getStatusReviews = createSelector(
  reviewsStatusSelector,
  (status) => status
);
