import React, { useEffect, Fragment } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllMovies,
  getMovieById,
  getStatusMovies,
} from "../../store/selectors/selectors";
import {
  AppRoute,
  AuthorizationStatus,
  TabName,
  FavoriteStatus,
  StateStatus,
} from "../../util/const";
import { getPlayerUrl, getReviewUrl } from "../../util/route";
import Tabs from "../tabs/tabs";
import { fetchMovies, postFavorite } from "../../store/api-actions";
import Loading from "../loading/loading";
import { changeActiveTab } from "../../store/action";
import MovieList from "../movie-list/movie-list";
import { filterSimilarMovies } from "../../util/movie";
import AddFavorite from "../add-favorite/add-favorite";
import NotFound from "../not-found/not-found";
import Header from "../header/header";

const Film = () => {
  const { id } = useParams();

  const movies = useSelector(getAllMovies);
  const movie = useSelector((state) => getMovieById(state, id));
  const statusMovies = useSelector(getStatusMovies);

  const { authorizationStatus } = useSelector((state) => state.USER);

  const dispatch = useDispatch();

  const history = useNavigate();

  const addToFavorite = () => {
    if (movie) {
      dispatch(postFavorite(movie.id, FavoriteStatus.FAVORITE));
    }
  };

  useEffect(() => {
    if (statusMovies === StateStatus.IDLE) {
      dispatch(fetchMovies());
    }
  }, [statusMovies, dispatch, id]);

  useEffect(() => {
    dispatch(changeActiveTab(TabName.OVERVIEW));
  }, []);

  if (!movie && statusMovies !== StateStatus.WORKING) {
    return <NotFound />;
  }

  let content;
  let similarMovies = [];

  if (statusMovies === StateStatus.WORKING) {
    return <Loading />;
  } else if (statusMovies === StateStatus.SUCCEEDED) {
    const { name, backgroundImagePath, genre, released } = movie;

    similarMovies = filterSimilarMovies(movies, movie);

    content = (
      <>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImagePath} alt={name} />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header className="movie-card__head" href={AppRoute.ROOT} />
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
      </>
    );
  }

  return (
    <Fragment>
      <section className="movie-card movie-card--full">{content}</section>
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
