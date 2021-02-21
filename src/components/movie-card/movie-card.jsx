import React, {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import Validator from '../../validate';

const CARD_HOVER_DELAY = 1000;
const IS_VIDEO_MUTED = true;

const MovieCard = ({movie}) => {
  const [shouldPlay, setShouldPlay] = useState(false);
  const {previewImagePath, name, id} = movie;

  const cardRef = useRef();
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
      <VideoPlayer
        src={`https://cdn.videvo.net/videvo_files/video/free/2012-07/small_watermarked/Countdown%20Timer_preview.webm`}
        shouldPlay={shouldPlay}
        muted={IS_VIDEO_MUTED}
        poster={previewImagePath}
        width="280"
        height="175"
      />
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: Validator.MOVIE
};

export default MovieCard;
