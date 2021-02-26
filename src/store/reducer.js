import {ActionType} from '../store/action';
import {AuthorizationStatus, FILTER_ALL_GENRES} from '../const';

const initialState = {
  selectedGenre: FILTER_ALL_GENRES,
  movies: [],
  userMovies: [],
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isDataLoaded: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        selectedGenre: action.payload
      };
    case ActionType.LOAD_MOVIES:
      return {
        ...state,
        movies: action.payload,
        isDataLoaded: true
      };
    case ActionType.REQUIRE_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload
      };
    default: return state;
  }
};

export {reducer};
