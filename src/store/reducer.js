import {ActionType} from '../store/action';
import movies from '../mocks/films';

const initialState = {
  genre: `all`,
  movies
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return {
        ...state,
        genre: action.payload
      };
    case ActionType.GET_MOVIES:
      return {
        ...state,
        movies: [...state.movies]
      };
    default: return state;
  }
};

export {reducer};
