import React from "react";
import PropTypes from "prop-types";

const ShowMore = ({ allItemsCount, renderedItemsCount, onShowMoreClick }) => {
  if (renderedItemsCount >= allItemsCount) {
    return null;
  }

  const handleShowMoreClick = (evt) => {
    evt.preventDefault();
    onShowMoreClick();
  };

  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={handleShowMoreClick}
      >
        Show more
      </button>
    </div>
  );
};

ShowMore.propTypes = {
  allItemsCount: PropTypes.number.isRequired,
  renderedItemsCount: PropTypes.number.isRequired,
  onShowMoreClick: PropTypes.func.isRequired,
};

export default ShowMore;
