import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getAllMovies} from '../../store/selectors/selectors';
import NotFound from '../not-found/not-found';
import VideoPlayer from '../video-player/video-player';

const PLAY_BUTTON_WIDTH = 19;
const PLAY_BUTTON_HEIGHT = 19;

const PAUSE_BUTTON_WIDTH = 14;
const PAUSE_BUTTON_HEIGHT = 21;

const FULL_SCREEN_BUTTON_WIDTH = 27;
const FULL_SCREEN_BUTTON_HEIGHT = 21;

const Player = () => {
  const {id} = useParams();

  const [isPlaying, setIsPlaying] = useState(true);

  const movies = useSelector((state) => getAllMovies(state));

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return <NotFound />;
  }

  const {videoUrl, backgroundImagePath, name} = movie;

  const createPlayerControlButton = (
      width,
      height,
      xlinkHref,
      label,
      className = `player__play`,
      onButtonClick = () => setIsPlaying(!isPlaying)) => {
    return (
      <button type="button" className={className} onClick={onButtonClick}>
        <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
          <use xlinkHref={xlinkHref}></use>
        </svg>
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="player">
      <VideoPlayer src={videoUrl} shouldPlay={isPlaying} poster={backgroundImagePath} preload="auto" />

      <button type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value="30" max="100"></progress>
            <div className="player__toggler" style={{left: `30%`}}>Toggler</div>
          </div>
          <div className="player__time-value">1:30:29</div>
        </div>

        <div className="player__controls-row">
          {!isPlaying ?
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
      </div >
    </div >
  );
};

export default Player;
