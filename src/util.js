import {FILTER_ALL_GENRES} from './const';

export const filterByGenre = (movies, genre) => {
  if (genre === FILTER_ALL_GENRES) {
    return movies;
  }

  const filtered = movies.filter((movie) => movie.genre === genre);
  return filtered;
};

export const getUniqueGenres = (movies) => {
  if (!movies || movies.length === 0) {
    return null;
  }

  const genres = movies.map((movie) => movie.genre);
  return [...new Set([FILTER_ALL_GENRES, ...genres])];
};
