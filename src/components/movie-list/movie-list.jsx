import React, {useState} from 'react';
import MovieCard from '../movie-card/movie-card';
import PropTypes from 'prop-types';

const MovieList = ({movies}) => {
  const [activeMovieId] = useState(0);
  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => <MovieCard key={movie.id} />)}
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired
};

export default MovieList;
