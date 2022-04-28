import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Validator from "../../util/validate";
import { AppRoute, StateStatus } from "../../util/const";
import { getMovieUrl } from "../../util/route";
import NotFound from "../not-found/not-found";
import AddReviewForm from "../add-review-form/add-review-form";
import SignInIndicator from "../sign-in-indicator/sign-in-indicator";
import { getAllMovies } from "../../store/selectors/selectors";
import AuthorizationProgress from "../authorization-progress/authorization-progress";
import Header from "../header/header";
import Logo from "../logo/logo";

const AddReview = () => {
  const { id } = useParams();

  const movies = useSelector((state) => getAllMovies(state));

  const { status: statusUser } = useSelector((state) => state.USER.status);

  if (statusUser === StateStatus.WORKING) {
    return <AuthorizationProgress />;
  }

  const movie = movies.find((item) => item.id === Number(id));

  if (!movie) {
    return <NotFound />;
  }

  const { backgroundImagePath, name, posterImagePath } = movie;

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundImagePath} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <Logo href={AppRoute.ROOT} />
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={getMovieUrl(id)}>
                  {name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <SignInIndicator />
        </Header>

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
  movies: Validator.MOVIES,
};

export default AddReview;
