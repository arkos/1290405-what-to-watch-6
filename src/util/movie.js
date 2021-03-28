import {MAX_MOVIES_MORE_LIKE_THIS, Rating} from "./const";
import {filterByGenre} from '../util/genre';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {nanoid} from "nanoid";

dayjs.extend(duration);

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

const ratingNamesMap = new Map([
  [Rating.BAD, `Bad`],
  [Rating.NORMAL, `Normal`],
  [Rating.GOOD, `Good`],
  [Rating.VERYGOOD, `Very good`],
  [Rating.AWESOME, `Awesome`],
]);

export const getRatingName = (rating) => {
  for (const [key, value] of ratingNamesMap) {
    if (rating < key) {
      return value;
    }
  }
  return null;
};

export const formatRating = (rating) => {
  let formattedRating = rating.toFixed(1).toString();
  formattedRating = formattedRating.replace(/\./g, `,`);
  return formattedRating;
};

export const formatRunTime = (runTime, template) => {
  return dayjs.duration(runTime, `minutes`).format(template);
};

export const filterSimilarMovies = (movies, movie, count = MAX_MOVIES_MORE_LIKE_THIS) => {
  let similarMovies = filterByGenre(movies, movie.genre);
  similarMovies = similarMovies.filter((similarMovie) => similarMovie.id !== movie.id);

  const similarMoviesMaxSize = Math.min(similarMovies.length, count);
  similarMovies = similarMovies.slice(0, similarMoviesMaxSize);

  return similarMovies;
};

export const formatMovieDuration = (durationInSec, template) => {
  return dayjs.duration(durationInSec, `seconds`).format(template);
};

export const generateStars = (count) => {
  const stars = new Array(count).fill();
  return stars.map((_) => nanoid());
};
