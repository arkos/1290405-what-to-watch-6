import {createSelector} from 'reselect';
import {filterByGenre} from '../../util';

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
