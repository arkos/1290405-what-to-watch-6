import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredMovies } from "../../store/selectors/selectors";
import { MOVIES_PER_PAGE, StateStatus } from "../../util/const";
import MovieList from "../movie-list/movie-list";
import GenreList from "../genre-list/genre-list";
import Loading from "../loading/loading";
import ShowMore from "../show-more/show-more";
import { fetchMovies } from "../../store/api-actions";
import { changeCountToRender, resetMain } from "../../store/action";
import Promo from "../promo/promo";

const Main = () => {
  let movies = useSelector((state) => getFilteredMovies(state));
  const { status: statusMovies } = useSelector((state) => state.MOVIES);
  const { renderedMoviesCount } = useSelector((state) => state.MOVIE);

  const filteredMoviesCount = movies.length;
  movies = movies.slice(0, renderedMoviesCount);

  const dispatch = useDispatch();

  useEffect(() => {
    if (statusMovies === StateStatus.WORKING) {
      dispatch(fetchMovies());
    }
  }, [statusMovies, dispatch]);

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

  if (statusMovies === StateStatus.WORKING) {
    return <Loading text="Loading movies ..." />;
  }

  return (
    <React.Fragment>
      <Promo />
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
