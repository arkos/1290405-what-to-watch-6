import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovieUrl } from "../../util/route";
import VideoPlayer, {
  PlayerControl,
  PlayerEvent,
} from "../video-player/video-player";
import Validator from "../../util/validate";

const CARD_HOVER_DELAY = 1000;
const IS_VIDEO_MUTED = true;
const VIDEO_PRELOAD = `auto`;

const MovieCard = ({ movie }) => {
  const [playerEvent, setPlayerEvent] = useState();

  const [playerControl, setPlayerControl] = useState(PlayerControl.LOAD);

  const [hasMouse, setHasMouse] = useState(false);
  const { name, id } = movie;

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
          setPlayerControl(PlayerControl.PLAY);
        }
      }, CARD_HOVER_DELAY);
    } else {
      setPlayerControl(PlayerControl.LOAD);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      isMounted = false;
    };
  }, [hasMouse]);

  const handlePlayerEvent = useCallback((playerEvent) => {
    setPlayerEvent(playerEvent);
  }, []);

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={getMovieUrl(id)}>
        <VideoPlayer
          playerConrol={playerControl}
          path={movie.videoUrl}
          onPlayerEvent={handlePlayerEvent}
          poster={movie.previewImagePath}
          width="280"
          height="175"
          style={{ objectFit: `fill` }}
          preload={VIDEO_PRELOAD}
          muted={IS_VIDEO_MUTED}
        />
      </Link>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={getMovieUrl(id)}>
          {playerEvent === PlayerEvent.LOAD_START
            ? `${name} (loading...)`
            : name}
        </Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: Validator.MOVIE,
};

export default MovieCard;
