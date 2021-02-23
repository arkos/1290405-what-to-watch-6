import {ActionType} from '../store/action';
import {AuthorizationStatus, FILTER_ALL_GENRES} from '../const';
import {filterByGenre} from '../util';

const initialState = {
  selectedGenre: FILTER_ALL_GENRES,
  movies: [],
  authorizationStatus: AuthorizationStatus.NO_AUTH
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
    case ActionType.REQUIRE_AUTHORIZATION:
      return {
        ...state,
        autorizationStatus: action.payload
      };
    default: return state;
  }
};

export {reducer};
