export const ActionType = {
  CHANGE_GENRE: `movies/changeGenre`,
  GET_MOVIES: `movies/getMovies`
};

export const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre
  }),
  getMovies: () => ({
    type: ActionType.GET_MOVIES
  })
};
