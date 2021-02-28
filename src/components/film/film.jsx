import React from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import Validator from '../../validate';
import {AVATAR_URL} from '../../const';
import {AppRoute, getReviewUrl} from '../../routes';
import Tabs from '../tabs/tabs';
import NotFound from '../not-found/not-found';

const Film = ({movies}) => {
  const {id} = useParams();

  const movie = movies.find((item) => item.id === Number(id));

  const history = useHistory();

  if (!movie) {
    return <NotFound />;
  }

  const {
    name,
    backgroundImagePath,
    genre,
    released
  } = movie;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={backgroundImagePath} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src={AVATAR_URL} alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{name}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{released}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button" onClick={() => history.push(`/player/${id}`)}>
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button" onClick={() => history.push(`/mylist`)}>
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              <Link className="btn movie-card__button" to={getReviewUrl(id)}>Add review</Link>
            </div>
          </div>
        </div>
      </div >

      <div className="movie-card__wrap movie-card__translate-top">
        <Tabs movie={movie}/>
      </div>
    </section >
  );
};

Film.propTypes = {
  movies: Validator.MOVIES
};

const mapStateToProps = (state) => ({
  movies: state.movies
});

export {Film};
export default connect(mapStateToProps, null)(Film);
