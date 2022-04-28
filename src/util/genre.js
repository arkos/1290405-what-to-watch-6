import { FILTER_ALL_GENRES, MAX_GENRES_COUNT } from "./const";

export const getUniqueGenres = (movies, count = MAX_GENRES_COUNT) => {
  if (!movies || movies.length === 0) {
    return [];
  }

  const genres = movies.map((movie) => movie.genre);
  return [...new Set([FILTER_ALL_GENRES, ...genres])].slice(0, count);
};

const genreToPluralMap = {
  [`Comedy`]: `Comedies`,
  [`Drama`]: `Dramas`,
  [`Thriller`]: `Thrillers`,
};

export const getGenreName = (genre) => {
  const genreName = genreToPluralMap[genre];
  return genreName || genre;
};

export const filterByGenre = (movies, genre) => {
  if (genre === FILTER_ALL_GENRES) {
    return movies;
  }

  const filtered = movies.filter((movie) => movie.genre === genre);
  return filtered;
};
