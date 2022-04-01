import React, { useEffect, Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllMovies } from "../../store/selectors/selectors";
import {
  AppRoute,
  AuthorizationStatus,
  TabName,
  FavoriteStatus,
} from "../../util/const";
import { getPlayerUrl, getReviewUrl } from "../../util/route";
import SignInIndicator from "../sign-in-indicator/sign-in-indicator";
import Tabs from "../tabs/tabs";
import { fetchMovie, postFavorite } from "../../store/api-actions";
import Loading from "../loading/loading";
import { changeActiveTab } from "../../store/action";
import MovieList from "../movie-list/movie-list";
import { filterSimilarMovies } from "../../util/movie";
import AddFavorite from "../add-favorite/add-favorite";

const Film = () => {
  const { id } = useParams();

  const movies = useSelector((state) => getAllMovies(state));

  const { authorizationStatus } = useSelector((state) => state.USER);

  const dispatch = useDispatch();

  const history = useNavigate();

  const movie = movies.find((item) => item.id === Number(id));

  const isMovieLoaded = movie !== undefined;

  const addToFavorite = () => {
    if (movie) {
      dispatch(postFavorite(movie.id, FavoriteStatus.FAVORITE));
    }
  };

  useEffect(() => {
    if (!isMovieLoaded) {
      dispatch(fetchMovie(id));
    }
  }, [isMovieLoaded]);

  useEffect(() => {
    dispatch(changeActiveTab(TabName.OVERVIEW));
  }, []);

  if (!isMovieLoaded) {
    return <Loading />;
  }

  const { name, backgroundImagePath, genre, released } = movie;

  const similarMovies = filterSimilarMovies(movies, movie);

  return (
    <Fragment>
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
            <SignInIndicator />
          </header>
          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>
              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={() => history(getPlayerUrl(id))}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <AddFavorite
                  onAddToFavorite={addToFavorite}
                  favoriteStatus={movie.isFavorite}
                />
                {authorizationStatus === AuthorizationStatus.AUTH && (
                  <Link
                    className="btn movie-card__button"
                    to={getReviewUrl(id)}
                  >
                    Add review
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="movie-card__wrap movie-card__translate-top">
          <Tabs movie={movie} />
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MovieList movies={similarMovies} />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default Film;
