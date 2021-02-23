import {ActionType} from '../store/action';
import {FILTER_ALL_GENRES} from '../const';
import {filterByGenre} from '../util';
import movies from '../mocks/films';
import reviews from '../mocks/reviews';

const [, , promo] = movies;

const initialState = {
  selectedGenre: FILTER_ALL_GENRES,
  movies,
  promo,
  initialMovies: movies,
  reviews
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        selectedGenre: action.payload
      };
    case ActionType.GET_MOVIES:
      const processedMovies = filterByGenre([...state.initialMovies], state.selectedGenre);

      return {
        ...state,
        movies: processedMovies
      };
    case ActionType.LOAD_MOVIES:
      return {
        ...state,
        movies: action.payload
      };
    default: return state;
  }
};

export {reducer};
