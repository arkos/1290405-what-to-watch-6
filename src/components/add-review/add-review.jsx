import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Validator from '../../util/validate';
import {AppRoute, AuthorizationStatus} from '../../util/const';
import {getMovieUrl} from '../../util/route';
import NotFound from '../not-found/not-found';
import AddReviewForm from '../add-review-form/add-review-form';
import SignInIndicator from '../sign-in-indicator/sign-in-indicator';
import {getAllMovies} from '../../store/selectors/selectors';
import AuthorizationProgress from '../authorization-progress/authorization-progress';

const AddReview = () => {
  const {id} = useParams();

  const movies = useSelector((state) => getAllMovies(state));

  const {authorizationStatus} = useSelector((state) => state.USER);

  if (authorizationStatus === AuthorizationStatus.UNKNOWN) {
    return <AuthorizationProgress />;
  }

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
            <Link to={AppRoute.ROOT} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={getMovieUrl(id)}>{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <SignInIndicator />
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={posterImagePath} alt={name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm movie={movie} />
      </div>
    </section>
  );
};

AddReview.propTypes = {
  movies: Validator.MOVIES
};

export default AddReview;
