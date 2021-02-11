import React from 'react';
import {Link, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AVATAR_URL} from '../../const';
import NotFound from '../not-found/not-found';
import AddReviewForm from '../add-review-form/add-review-form';

const AddReview = ({movies}) => {
  const {id} = useParams();

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return <NotFound />;
  }

  const {backgroundImagePath, name, posterImagePath} = movie;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImagePath} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={`/films/${id}`}>{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={`/films/${id}/review`}>Add review</Link>
              </li>
            </ul>
          </nav>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src={AVATAR_URL} alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImagePath} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm />
      </div>
    </section>
  );
};

AddReview.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    backgroundImagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    posterImagePath: PropTypes.string.isRequired
  })).isRequired
};

export default AddReview;
