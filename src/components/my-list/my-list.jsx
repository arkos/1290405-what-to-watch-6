import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppRoute, State, StateStatus } from "../../util/const";
import MovieList from "../movie-list/movie-list";
import SignInIndicator from "../sign-in-indicator/sign-in-indicator";
import { getFavoriteMovies } from "../../store/selectors/selectors";
import { fetchFavorites } from "../../store/api-actions";
import Loading from "../loading/loading";
import AuthorizationProgress from "../authorization-progress/authorization-progress";
import Header from "../header/header";
import Logo from "../logo/logo";

const MyList = () => {
  const favoriteMovies = useSelector((state) => getFavoriteMovies(state));
  const { isFavoriteLoading } = useSelector((state) => state.MOVIE);
  const { status: statusUser } = useSelector((state) => state.USER.status);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, []);

  if (statusUser === StateStatus.WORKING) {
    return <AuthorizationProgress />;
  }

  if (isFavoriteLoading === State.SAVING) {
    return <Loading />;
  }

  return (
    <div className="user-page">
      <Header className="user-page__head">
        <Logo href={AppRoute.ROOT} />
        <h1 className="page-title user-page__title">My list</h1>
        <SignInIndicator />
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MovieList movies={favoriteMovies} />
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
  );
};

export default MyList;
