export const ActionType = {
  CHANGE_GENRE: `movies/changeGenre`,
  GET_MOVIES: `movies/getMovies`,
  LOAD_MOVIES: `data/loadMovies`
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  getMovies: () => ({
    type: ActionType.GET_MOVIES
  }),
  loadMovies: (movies) => ({
    type: ActionType.LOAD_MOVIES,
    payload: movies
  })
};
