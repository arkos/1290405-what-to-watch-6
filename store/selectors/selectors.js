import {createSelector} from 'reselect';
import {filterByGenre} from "../../util/genre";

const moviesSelector = ({DATA}) => DATA.movies;
const genreSelector = ({MOVIE}) => MOVIE.selectedGenre;

export const getFilteredMovies = createSelector(
    [moviesSelector, genreSelector],
    (movies, genre) => filterByGenre(movies, genre)
);

export const getAllMovies = createSelector(
    moviesSelector,
    (movies) => movies
);

export const getFavoriteMovies = createSelector(
    moviesSelector,
    (movies) => {
      return movies.filter((movie) => movie.isFavorite);
    }
);

export const getPromoMovie = createSelector(
    moviesSelector,
    (movies) => {
      return movies.find((movie) => movie.isPromo);
    }
);
