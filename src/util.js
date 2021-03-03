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

const genreToPluralMap = {
  [`Comedy`]: `Comedies`,
  [`Drama`]: `Dramas`,
  [`Thriller`]: `Thrillers`
};

export const getGenreName = (genre) => {
  const genreName = genreToPluralMap[genre];
  return genreName || genre;
};

export const adaptToClient = (movie) => {
  const adaptedMovie = Object.assign({}, movie, {
    posterImagePath: movie.poster_image,
    previewImagePath: movie.preview_image,
    backgroundImagePath: movie.background_image,
    backgroundColor: movie.background_color,
    videoUrl: movie.video_link,
    previewVideoUrl: movie.preview_video_link,
    score: movie.scores_count,
    runTime: movie.run_time,
    isFavorite: movie.is_favorite
  });

  delete adaptedMovie.poster_image;
  delete adaptedMovie.preview_image;
  delete adaptedMovie.background_image;
  delete adaptedMovie.background_color;
  delete adaptedMovie.video_link;
  delete adaptedMovie.preview_video_link;
  delete adaptedMovie.scores_count;
  delete adaptedMovie.run_time;
  delete adaptedMovie.is_favorite;

  return adaptedMovie;
};
