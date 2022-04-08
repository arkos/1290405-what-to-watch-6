import React, { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllMovies } from "../../store/selectors/selectors";
import NotFound from "../not-found/not-found";
import VideoPlayer, {
  PlayerControl,
  PlayerEvent,
} from "../video-player/video-player";
import { AppRoute } from "../../util/const";
import { formatMovieDuration } from "../../util/movie";

const PlayButtonSize = {
  WIDTH: 19,
  HEIGHT: 19,
};

const PauseButtonSize = {
  WIDTH: 14,
  HEIGHT: 21,
};

const FullScreenButtonSize = {
  WIDTH: 27,
  HEIGHT: 27,
};

const DEFAULT_DURATION_FORMAT = `HH:mm:ss`;

const Player = () => {
  const { id } = useParams();

  const [videoDurationInSec, setVideoDuration] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);

  const [elapsedPercent, setElapsedPercent] = useState(0);

  const [formattedTimeLeft, setFormattedTimeLeft] = useState(
    formatMovieDuration(0, DEFAULT_DURATION_FORMAT)
  );

  const [isLoading, setIsLoading] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);

  const [playerControl, setPlayerControl] = useState(PlayerControl.PLAY);

  const movies = useSelector((state) => getAllMovies(state));

  const history = useNavigate();

  const movie = movies.find((item) => item.id === Number(id));

  const handleExitButtonClick = (evt) => {
    evt.preventDefault();

    if (history.length > 1) {
      history(-1);
      return;
    }
    history(AppRoute.ROOT);
  };

  const handlePlayerEvent = useCallback((playerEvent, data) => {
    switch (playerEvent) {
      case PlayerEvent.DURATION_CHANGE:
        setVideoDuration(data);
        break;
      case PlayerEvent.TIME_UPDATE:
        setCurrentTime(data);
        break;
      case PlayerEvent.PLAYING:
        setIsPlaying(true);
        break;
      case PlayerEvent.PAUSED:
        setIsPlaying(false);
        break;
      case PlayerEvent.LOAD_START:
        setIsLoading(true);
        break;
      case PlayerEvent.CANPLAYTHROUGH:
        setIsLoading(false);
        break;
      default:
    }
  }, []);

  const handleFullScreen = (evt) => {
    evt.preventDefault();

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const handlePlayButtonClick = () => {
    setPlayerControl(PlayerControl.PLAY);
  };

  const handlePauseButtonClick = () => {
    setPlayerControl(PlayerControl.PAUSE);
  };

  useEffect(() => {
    setElapsedPercent((currentTime / videoDurationInSec) * 100);
    setFormattedTimeLeft(
      formatMovieDuration(
        videoDurationInSec - currentTime,
        DEFAULT_DURATION_FORMAT
      )
    );
  }, [currentTime, videoDurationInSec]);

  if (!movie) {
    return <NotFound />;
  }

  const createPlayerControlButton = (
    width,
    height,
    xlinkHref,
    label,
    className = `player__play`,
    onButtonClick
  ) => {
    return (
      <button
        type="button"
        disabled={`${isLoading ? `disabled` : ``}`}
        className={className}
        onClick={onButtonClick}
      >
        <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
          <use xlinkHref={xlinkHref}></use>
        </svg>
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="player">
      <VideoPlayer
        playerConrol={playerControl}
        className="player__video"
        path={movie.videoUrl}
        onPlayerEvent={handlePlayerEvent}
        preload="auto"
      />

      <>
        <button
          type="button"
          className="player__exit"
          onClick={handleExitButtonClick}
        >
          Exit
        </button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress
                className="player__progress"
                value={currentTime}
                max={videoDurationInSec}
              ></progress>
              <div
                className="player__toggler"
                style={{ left: `${elapsedPercent}%` }}
              >
                Toggler
              </div>
            </div>
            <div className="player__time-value">{formattedTimeLeft}</div>
          </div>
          <div className="player__controls-row">
            {!isPlaying
              ? createPlayerControlButton(
                  PlayButtonSize.WIDTH,
                  PlayButtonSize.HEIGHT,
                  `#play-s`,
                  `Play`,
                  `player__play`,
                  handlePlayButtonClick
                )
              : createPlayerControlButton(
                  PauseButtonSize.WIDTH,
                  PauseButtonSize.HEIGHT,
                  `#pause`,
                  `Pause`,
                  `player__play`,
                  handlePauseButtonClick
                )}
            <div className="player__name">{movie.name}</div>

            {createPlayerControlButton(
              FullScreenButtonSize.WIDTH,
              FullScreenButtonSize.HEIGHT,
              `#full-screen`,
              `Full screen`,
              `player__full-screen`,
              (evt) => handleFullScreen(evt)
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Player;
