import React, {useRef, useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import Validator from '../../util/validate';
import {formatMovieDuration} from '../../util/movie';

const PlayButtonSize = {
  WIDTH: 19,
  HEIGHT: 19
};

const PauseButtonSize = {
  WIDTH: 14,
  HEIGHT: 21
};

const FullScreenButtonSize = {
  WIDTH: 27,
  HEIGHT: 21
};

const DEFAULT_DURATION_FORMAT = `HH:mm:ss`;

const VideoPlayer = ({shouldPlay, movie, isPreview, onPlayButtonClick, onExitButtonClick, ...restProps}) => {
  const {videoUrl, previewVideoUrl, previewImagePath, backgroundImagePath, name} = movie;

  const videoRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [videoDurationInSec, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [elapsedPercent, setElapsedPercent] = useState(0);
  const [formattedTimeLeft, setFormattedTimeLeft] = useState(formatMovieDuration(0, DEFAULT_DURATION_FORMAT));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    videoRef.current.oncanplaythrough = () => setIsLoading(false);
    videoRef.current.ontimeupdate = () => {
      setCurrentTime(videoRef.current.currentTime);
      const percent = videoRef.current.currentTime / videoRef.current.duration * 100;
      setElapsedPercent(percent);
      setFormattedTimeLeft(formatMovieDuration(videoRef.current.duration - videoRef.current.currentTime, DEFAULT_DURATION_FORMAT));
    };
    videoRef.current.ondurationchange = () => setVideoDuration(videoRef.current.duration);
    videoRef.current.onpause = () => {
      setIsPlaying(false);

      if (isPreview) {
        return videoRef.current.load();
      }
      return () => {};
    };
    videoRef.current.onplaying = () => setIsPlaying(true);

    return () => {
      videoRef.current.oncanplaythrough = null;
      videoRef.current.onplay = null;
      videoRef.current.onplaying = null;
      videoRef.current.onpause = null;
      videoRef.current.ontimeupdate = null;
      videoRef.current.ondurationchange = null;
      videoRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (shouldPlay && videoRef.current.paused && !isPlaying) {
      videoRef.current.play().catch(() => {});
      return;
    }
    if (!videoRef.current.paused && isPlaying) {
      videoRef.current.pause();
    }
  }, [shouldPlay]);

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

  const handleExitButtonClick = (evt) => {
    evt.preventDefault();

    onExitButtonClick();
  };

  const createPlayerControlButton = (
      width,
      height,
      xlinkHref,
      label,
      className = `player__play`,
      onButtonClick = onPlayButtonClick) => {
    return (
      <button type="button" disabled={`${isLoading ? `disabled` : ``}`} className={className} onClick={onButtonClick}>
        <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
          <use xlinkHref={xlinkHref}></use>
        </svg>
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className={`${!isPreview ? `player` : ``}`}>
      <video className={`${isPreview ? `` : `player__video`}`} ref={videoRef} poster={`${isPreview ? previewImagePath : backgroundImagePath}`} {...restProps}>
        <source src={isPreview ? previewVideoUrl : videoUrl}/>
      Your browser doesn&apos;t support HTML5 video.
      </video>

      {!isPreview && <Fragment>
        <button type="button" className="player__exit" onClick={handleExitButtonClick}>Exit</button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={currentTime} max={videoDurationInSec}></progress>
              <div className="player__toggler" style={{"left": `${elapsedPercent}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{formattedTimeLeft}</div>
          </div>
          <div className="player__controls-row">
            {!shouldPlay ?
              createPlayerControlButton(PlayButtonSize.WIDTH, PlayButtonSize.HEIGHT, `#play-s`, `Play`) :
              createPlayerControlButton(PauseButtonSize.WIDTH, PauseButtonSize.HEIGHT, `#pause`, `Pause`)
            }
            <div className="player__name">{name}</div>

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
      </Fragment>}
    </div>
  );
};

VideoPlayer.propTypes = {
  shouldPlay: PropTypes.bool.isRequired,
  movie: Validator.MOVIE,
  isPreview: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
  onExitButtonClick: PropTypes.func.isRequired
};

export default VideoPlayer;
