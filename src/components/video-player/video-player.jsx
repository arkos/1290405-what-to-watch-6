import React, {useRef, useState, useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import Validator from '../../util/validate';

const PLAY_BUTTON_WIDTH = 19;
const PLAY_BUTTON_HEIGHT = 19;

const PAUSE_BUTTON_WIDTH = 14;
const PAUSE_BUTTON_HEIGHT = 21;

const FULL_SCREEN_BUTTON_WIDTH = 27;
const FULL_SCREEN_BUTTON_HEIGHT = 21;

const VideoPlayer = ({shouldPlay, movie, isPreview, onPlayButtonClick, ...restProps}) => {
  const {videoUrl, previewVideoUrl, previewImagePath, backgroundImagePath, name} = movie;

  const videoRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    videoRef.current.oncanplaythrough = () => setIsLoading(false);
    videoRef.current.onpause = isPreview ? () => videoRef.current.load() : () => {};

    return () => {
      videoRef.current.oncanplaythrough = null;
      videoRef.current.onplay = null;
      videoRef.current.onpause = null;
      videoRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (shouldPlay) {
      videoRef.current.play();
      return;
    }

    videoRef.current.pause();
  }, [shouldPlay]);

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
      <video className="player__video" ref={videoRef} poster={`${isPreview ? previewImagePath : backgroundImagePath}`} {...restProps}>
        <source src={isPreview ? previewVideoUrl : videoUrl}/>
      Your browser doesn&apos;t support HTML5 video.
      </video>

      {!isPreview && <Fragment>
        <button type="button" className="player__exit">Exit</button>
        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"></progress>
              <div className="player__toggler">Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>
          <div className="player__controls-row">
            {!shouldPlay ?
              createPlayerControlButton(PLAY_BUTTON_WIDTH, PLAY_BUTTON_HEIGHT, `#play-s`, `Play`) :
              createPlayerControlButton(PAUSE_BUTTON_WIDTH, PAUSE_BUTTON_HEIGHT, `#pause`, `Pause`)
            }
            <div className="player__name">{name}</div>

            {createPlayerControlButton(
                FULL_SCREEN_BUTTON_WIDTH,
                FULL_SCREEN_BUTTON_HEIGHT,
                `#full-screen`,
                `Full screen`,
                `player__full-screen`
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
  onPlayButtonClick: PropTypes.func.isRequired
};

export default VideoPlayer;
