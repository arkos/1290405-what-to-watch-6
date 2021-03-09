import React from 'react';
import Validator from '../../util/validate';
import OverviewTab from '../overview-tab/overview-tab';

const Tabs = ({movie}) => {
  return (
    <div className="movie-card__info">
      <div className="movie-card__poster movie-card__poster--big">
        <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
      </div>

      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li className="movie-nav__item movie-nav__item--active">
              <a href="#" className="movie-nav__link">Overview</a>
            </li>
            <li className="movie-nav__item">
              <a href="#" className="movie-nav__link">Details</a>
            </li>
            <li className="movie-nav__item">
              <a href="#" className="movie-nav__link">Reviews</a>
            </li>
          </ul>
        </nav>
        <OverviewTab movie={movie}/>
      </div>
    </div>
  );
};

Tabs.propTypes = {
  movie: Validator.MOVIE
};

export default Tabs;
