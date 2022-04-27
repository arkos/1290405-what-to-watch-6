import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredMovies,
  getPromoMovie,
} from "../../store/selectors/selectors";
import { FavoriteStatus, MOVIES_PER_PAGE, StateStatus } from "../../util/const";
import { getPlayerUrl } from "../../util/route";
import MovieList from "../movie-list/movie-list";
import GenreList from "../genre-list/genre-list";
import Loading from "../loading/loading";
import ShowMore from "../show-more/show-more";
import SignInIndicator from "../sign-in-indicator/sign-in-indicator";
import { fetchMovies, postFavorite, fetchPromo } from "../../store/api-actions";
import { changeCountToRender, resetMain } from "../../store/action";
import AddFavorite from "../add-favorite/add-favorite";

const Main = () => {
  let movies = useSelector((state) => getFilteredMovies(state));
  const { status: statusMovies } = useSelector((state) => state.MOVIES);
  const { renderedMoviesCount } = useSelector((state) => state.MOVIE);

  const { status: statusPromo } = useSelector((state) => state.PROMO);
  const promo = useSelector((state) => getPromoMovie(state));

  const filteredMoviesCount = movies.length;
  movies = movies.slice(0, renderedMoviesCount);

  const dispatch = useDispatch();

  const history = useNavigate();

  useEffect(() => {
    if (statusMovies === StateStatus.WORKING) {
      dispatch(fetchMovies());
    }
  }, [statusMovies, dispatch]);

  useEffect(() => {
    if (statusPromo === StateStatus.WORKING) {
      dispatch(fetchPromo());
    }
  }, [statusPromo, dispatch]);

  useEffect(() => {
    dispatch(resetMain());
  }, []);

  const showMoreMovies = () => {
    dispatch(
      changeCountToRender(
        Math.min(filteredMoviesCount, renderedMoviesCount + MOVIES_PER_PAGE)
      )
    );
  };

  const addToFavorite = () => {
    if (promo) {
      dispatch(postFavorite(promo.id, FavoriteStatus.FAVORITE));
    }
  };

  if (
    statusMovies === StateStatus.WORKING ||
    statusPromo === StateStatus.WORKING
  ) {
    return <Loading />;
  }

  const { id, name, backgroundImagePath, posterImagePath, genre, released } =
    promo;

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={backgroundImagePath} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <SignInIndicator />
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img
                src={posterImagePath}
                alt={`${name} poster`}
                width="218"
                height="327"
              />
            </div>

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
                  favoriteStatus={promo.isFavorite}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList />

          <MovieList movies={movies} />

          <ShowMore
            allItemsCount={filteredMoviesCount}
            renderedItemsCount={renderedMoviesCount}
            onShowMoreClick={showMoreMovies}
          />
        </section>

        <footer className="page-footer">
          <div className="logo">
            <a className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
};

export default Main;
