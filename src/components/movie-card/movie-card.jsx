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
  const [hasMouse, setHasMouse] = useState(false);
  const {name, id} = movie;

  const handleMouseLeave = () => {
    setHasMouse(false);
  };

  const handleMouseEnter = () => {
    setHasMouse(true);
  };

  useEffect(() => {
    let isMounted = true;
    let timer = null;

    if (hasMouse) {
      timer = setTimeout(() => {
        if (isMounted) {
          setShouldPlay(true);
        }
      }, CARD_HOVER_DELAY);
    } else {
      setShouldPlay(false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      isMounted = false;
    };
  }, [hasMouse]);

  return (
    <article className="small-movie-card catalog__movies-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link to={getMovieUrl(id)}>
        <VideoPlayer
          movie={movie}
          shouldPlay={shouldPlay}
          isPreview={true}
          muted={IS_VIDEO_MUTED}
          preload={VIDEO_PRELOAD}
          onPlayButtonClick={() => {}}
          onExitButtonClick={() => {}}
          width="280"
          height="175"
          style={{"objectFit": `fill`}}
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
