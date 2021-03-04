import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getUniqueGenres} from '../../util/genre';
import {changeGenre} from '../../store/action';
import {getGenreName} from '../../util/genre';
import {getAllMovies} from '../../store/selectors/selectors';

const GenreList = () => {
  const dispatch = useDispatch();

  const genres = useSelector((state) => getUniqueGenres(getAllMovies(state)));
  const {selectedGenre} = useSelector((state) => state.MOVIE);

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

export default GenreList;
