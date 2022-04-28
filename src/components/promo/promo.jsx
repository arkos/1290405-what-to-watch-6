import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPromoMovie } from "../../store/selectors/selectors";
import { fetchPromo } from "../../store/api-actions";
import { StateStatus, FavoriteStatus } from "../../util/const";
import { postFavorite } from "../../store/api-actions";
import { getPlayerUrl } from "../../util/route";
import Header from "../header/header";
import AddFavorite from "../add-favorite/add-favorite";
import Loading from "../loading/loading";

const Promo = () => {
  const { status: statusPromo } = useSelector((state) => state.PROMO);
  const promo = useSelector((state) => getPromoMovie(state));

  const dispatch = useDispatch();

  const history = useNavigate();

  useEffect(() => {
    if (statusPromo === StateStatus.WORKING) {
      dispatch(fetchPromo());
    }
  }, [statusPromo, dispatch]);

  const addToFavorite = () => {
    if (promo) {
      dispatch(postFavorite(promo.id, FavoriteStatus.FAVORITE));
    }
  };

  if (statusPromo === StateStatus.WORKING) {
    return <Loading text="Loading promo ..." />;
  }

  const { id, name, backgroundImagePath, posterImagePath, genre, released } =
    promo;

  return (
    <section className="movie-card">
      <div className="movie-card__bg">
        <img src={backgroundImagePath} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header className="movie-card__head" />
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
  );
};

export default Promo;
