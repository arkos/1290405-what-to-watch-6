import React from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AVATAR_URL} from '../../const';
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
    released,
    posterImagePath,
    rating,
    score,
    description,
    director,
    starring
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
            <Link to="/" className="logo__link">
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
              <Link className="btn movie-card__button" to={`/films/${id}/review`}>Add review</Link>
            </div>
          </div>
        </div>
      </div >

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={posterImagePath} alt={`${name} poster`} width="218" height="327" />
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

            <div className="movie-rating">
              <div className="movie-rating__score">{rating}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">Very good</span>
                <span className="movie-rating__count">{`${score} ratings`}</span>
              </p>
            </div>

            <div className="movie-card__text">
              <p>{description}</p>

              <p className="movie-card__director"><strong>{`Director: ${director}`}</strong></p>

              <p className="movie-card__starring"><strong>{`Starring: ${starring.join(`, `)} and other`}</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

Film.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    backgroundImagePath: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    released: PropTypes.number,
    posterImagePath: PropTypes.string.isRequired,
    rating: PropTypes.number,
    score: PropTypes.number,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired
  })).isRequired
};

export default Film;
