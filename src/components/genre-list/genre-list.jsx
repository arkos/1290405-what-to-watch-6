import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUniqueGenres} from '../../util';

const GenreList = ({genres, selectedGenre}) => {

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, index) => (
        <li key={index} className={`catalog__genres-item ${genre === selectedGenre ? `catalog__genres-item--active` : ``}`}>
          <a href="#" className="catalog__genres-link">{genre}</a>
        </li>

      ))}
    </ul>
  );
};

GenreList.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedGenre: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  genres: getUniqueGenres(state.movies)
});

export {GenreList};
export default connect(mapStateToProps, null)(GenreList);
