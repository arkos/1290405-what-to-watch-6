import React from 'react';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {AuthorizationStatus} from '../../util/const';


const AddFavorite = ({onAddToFavorite, favoriteStatus}) => {
  const {authorizationStatus} = useSelector((state) => state.USER);

  const handleAddToFavoritesClick = (evt) => {
    evt.preventDefault();
    onAddToFavorite();
  };

  return (
    authorizationStatus === AuthorizationStatus.AUTH &&
    !favoriteStatus &&
    (
      <button className="btn btn--list movie-card__button" type="button" onClick={handleAddToFavoritesClick}>
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>
        <span>My list</span>
      </button>
    ));
};

AddFavorite.propTypes = {
  onAddToFavorite: PropTypes.func.isRequired,
  favoriteStatus: PropTypes.bool.isRequired
};

export default AddFavorite;
