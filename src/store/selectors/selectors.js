import {createSelector} from 'reselect';
import {filterByGenre} from '../../util';

const moviesSelector = (state) => state.movies;
const genreSelector = (state) => state.selectedGenre;

export const getFilteredMovies = createSelector(
    [moviesSelector, genreSelector],
    (movies, genre) => filterByGenre(movies, genre)
);

export const getAllMovies = createSelector(
    moviesSelector,
    (movies) => movies
);
