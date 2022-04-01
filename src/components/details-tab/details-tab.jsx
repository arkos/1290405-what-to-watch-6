import React, { Fragment } from "react";
import Validator from "../../util/validate";
import { formatRunTime } from "../../util/movie";

const DetailsTab = ({ movie }) => {
  const { director, genre, released, runTime, starring } = movie;

  return (
    <Fragment>
      <div className="movie-card__text movie-card__row">
        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Director</strong>
            <span className="movie-card__details-value">{director}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Starring</strong>
            <span className="movie-card__details-value">
              {starring.map((item, index) => {
                const isLastItem = index === starring.length - 1;
                return (
                  <Fragment key={item}>
                    {item}
                    {isLastItem ? `` : `,`}
                    {isLastItem ? `` : <br />}
                  </Fragment>
                );
              })}
            </span>
          </p>
        </div>

        <div className="movie-card__text-col">
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Run Time</strong>
            <span className="movie-card__details-value">
              {formatRunTime(runTime, `H[h] mm[m]`)}
            </span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Genre</strong>
            <span className="movie-card__details-value">{genre}</span>
          </p>
          <p className="movie-card__details-item">
            <strong className="movie-card__details-name">Released</strong>
            <span className="movie-card__details-value">{released}</span>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

DetailsTab.propTypes = {
  movie: Validator.MOVIE,
};

export default DetailsTab;
