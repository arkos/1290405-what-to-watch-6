import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {changeActiveTab} from '../../store/action';
import {TabName} from '../../util/const';
import Validator from '../../util/validate';
import DetailsTab from '../details-tab/details-tab';
import OverviewTab from '../overview-tab/overview-tab';
import ReviewsTab from '../reviews-tab/reviews-tab';

const Tabs = ({movie}) => {
  const {activeTab} = useSelector((state) => state.MOVIE);
  const dispatch = useDispatch();

  const onClickTab = (tab) => {
    dispatch(changeActiveTab(tab));
  };

  return (
    <div className="movie-card__info">
      <div className="movie-card__poster movie-card__poster--big">
        <img src={movie.posterImagePath} alt={`${movie.name} poster`} width="218" height="327" />
      </div>

      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li className={`movie-nav__item ${activeTab === TabName.OVERVIEW ? `movie-nav__item--active` : ``}`}>
              <a href="#" className="movie-nav__link" onClick={
                (evt) => {
                  evt.preventDefault();
                  onClickTab(TabName.OVERVIEW);
                }
              }>Overview</a>
            </li>
            <li className={`movie-nav__item ${activeTab === TabName.DETAILS ? `movie-nav__item--active` : ``}`}>
              <a href="#" className="movie-nav__link" onClick={
                (evt) => {
                  evt.preventDefault();
                  onClickTab(TabName.DETAILS);
                }
              }>Details</a>
            </li>
            <li className={`movie-nav__item ${activeTab === TabName.REVIEWS ? `movie-nav__item--active` : ``}`}>
              <a href="#" className="movie-nav__link" onClick={
                (evt) => {
                  evt.preventDefault();
                  onClickTab(TabName.REVIEWS);
                }
              }>Reviews</a>
            </li>
          </ul>
        </nav>
        {activeTab === TabName.OVERVIEW && <OverviewTab movie={movie}/>}
        {activeTab === TabName.DETAILS && <DetailsTab movie={movie}/>}
        {activeTab === TabName.REVIEWS && <ReviewsTab movie={movie}/>}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  movie: Validator.MOVIE
};

export default Tabs;
