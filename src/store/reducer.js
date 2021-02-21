import {ActionType} from '../store/action';
import {FILTER_ALL_GENRES} from '../const';
import {filterByGenre} from '../util';
import movies from '../mocks/films';
import reviews from '../mocks/reviews';

const initialState = {
  selectedGenre: FILTER_ALL_GENRES,
  movies,
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
    default: return state;
  }
};

export {reducer};
