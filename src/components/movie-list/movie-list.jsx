import React, { useState } from "react";
import MovieCard from "../movie-card/movie-card";
import Validator from "../../util/validate";

const MovieList = ({ movies }) => {
  const [activeMovie] = useState(0);

  return (
    <div className="catalog__movies-list">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} activeMovie={activeMovie} />
      ))}
    </div>
  );
};

MovieList.propTypes = {
  movies: Validator.MOVIES,
};

export default MovieList;
