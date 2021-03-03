import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getFilteredMovies} from '../../store/selectors/selectors';
import {AuthorizationStatus, AVATAR_URL} from '../../const';
import {AppRoute, getPlayerUrl} from '../../routes';
import MovieList from '../movie-list/movie-list';
import GenreList from '../genre-list/genre-list';
import Loading from '../loading/loading';
import {fetchMovies} from '../../store/api-actions';

const Main = () => {

  const movies = useSelector((state) => getFilteredMovies(state));
  const {authorizationStatus} = useSelector((state) => state.USER);
  const {isDataLoaded} = useSelector((state) => state.DATA);

  const [promo = {}] = movies;

  const {id, name, backgroundImagePath, posterImagePath, genre, released} = promo;

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchMovies());
    }
  }, [isDataLoaded]);

  if (!isDataLoaded) {
    return <Loading />;
  }

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

          <div className="user-block">
            {
              authorizationStatus === AuthorizationStatus.AUTH &&
            <div className="user-block__avatar">
              <img src={AVATAR_URL} alt="User avatar" width="63" height="63" />
            </div>
            }
            {
              authorizationStatus === AuthorizationStatus.NO_AUTH &&
              <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
            }
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={posterImagePath} alt={`${name} poster`} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{released}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button" onClick={() => history.push(getPlayerUrl(id))}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button" onClick={() => history.push(AppRoute.MYLIST)}>
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section >

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList />

          <MovieList movies={movies} />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
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

    </React.Fragment >
  );
};

export default Main;
