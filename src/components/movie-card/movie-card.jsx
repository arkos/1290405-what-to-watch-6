import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const MovieCard = ({movie}) => {
  const {previewImagePath, name, id} = movie;
  return (
    <article className="small-movie-card catalog__movies-card">
      <div className="small-movie-card__image">
        <img src={previewImagePath} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <Link className="small-movie-card__link" to={`/films/${id}`}>{name}</Link>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    previewImagePath: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  }).isRequired
};

export default MovieCard;
