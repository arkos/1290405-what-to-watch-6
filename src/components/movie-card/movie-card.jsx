import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getMovieUrl} from '../../util/route';
import VideoPlayer from '../video-player/video-player';
import Validator from '../../util/validate';

const CARD_HOVER_DELAY = 1000;
const IS_VIDEO_MUTED = true;
const VIDEO_PRELOAD = `none`;

const MovieCard = ({movie}) => {
  const [shouldPlay, setShouldPlay] = useState(false);
  const {previewImagePath, previewVideoUrl, name, id} = movie;

  let timer = null;

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setShouldPlay(false);
    timer = null;
  };

  const handleMouseEnter = () => {
    if (!timer) {
      timer = setTimeout(() => {
        setShouldPlay(true);
      }, CARD_HOVER_DELAY);
    }
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <article className="small-movie-card catalog__movies-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to={getMovieUrl(id)}>
        <VideoPlayer
          src={previewVideoUrl}
          shouldPlay={shouldPlay}
          muted={IS_VIDEO_MUTED}
          poster={previewImagePath}
          preload={VIDEO_PRELOAD}
        />
      </Link>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={getMovieUrl(id)}>{name}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: Validator.MOVIE
};

export default MovieCard;
