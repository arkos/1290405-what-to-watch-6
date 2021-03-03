import React from 'react';
import {connect, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {getUniqueGenres} from '../../util';
import {changeGenre} from '../../store/action';
import {getGenreName} from '../../util';
import {getAllMovies} from '../../store/selectors/selectors';

const GenreList = ({genres, selectedGenre}) => {
  const dispatch = useDispatch();

  const handleSelectGenre = (evt) => {
    evt.preventDefault();
    dispatch(changeGenre(evt.target.dataset.genre));
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre, index) => (
        <li key={index} className={`catalog__genres-item ${genre === selectedGenre ? `catalog__genres-item--active` : ``}`}>
          <a href="#" className="catalog__genres-link" data-genre={genre} onClick={(evt) => handleSelectGenre(evt)}>{getGenreName(genre)}</a>
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
  genres: getUniqueGenres(getAllMovies(state)),
  selectedGenre: state.MOVIE.selectedGenre
});

export {GenreList};
export default connect(mapStateToProps)(GenreList);
