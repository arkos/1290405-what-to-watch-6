import React from 'react';
import {useParams} from 'react-router-dom';
import {connect} from 'react-redux';
import Validator from '../../validate';
import NotFound from '../not-found/not-found';

const Player = ({movies}) => {
  const {id} = useParams();

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return <NotFound />;
  }

  const {videoUrl, backgroundImagePath, name} = movie;

  return (
    <div className="player">
      <video src={videoUrl} className="player__video" poster={backgroundImagePath}></video>

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
          <button type="button" className="player__play">
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">{name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div >
    </div >
  );
};

Player.propTypes = {
  movies: Validator.MOVIES
};

const mapStateToProps = ({DATA}) => ({
  movies: DATA.movies
});

export {Player};
export default connect(mapStateToProps, null)(Player);
