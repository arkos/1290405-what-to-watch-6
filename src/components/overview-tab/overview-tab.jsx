import React, {Fragment} from 'react';
import Validator from '../../util/validate';
import {getRatingName} from '../../util/movie';

const OverviewTab = ({movie}) => {
  const {rating, score, director, starring, description} = movie;

  return (
    <Fragment>
      <div className="movie-rating">
        <div className="movie-rating__score">{rating}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{getRatingName(rating)}</span>
          <span className="movie-rating__count">{`${score} ratings`}</span>
        </p>
      </div>
      <div className="movie-card__text">
        <p>{description}</p>

        <p className="movie-card__director"><strong>{`Director: ${director}`}</strong></p>

        <p className="movie-card__starring"><strong>{`Starring: ${starring.join(`, `)} and other`}</strong></p>
      </div>
    </Fragment>
  );
};

OverviewTab.propTypes = {
  movie: Validator.MOVIE
};

export default OverviewTab;
