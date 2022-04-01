import PropTypes from "prop-types";

const movieValidator = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  posterImagePath: PropTypes.string,
  previewImagePath: PropTypes.string,
  backgroundImagePath: PropTypes.string,
  backgroundColor: (props, propName, componentName) => {
    if (!/^#[0-9a-fA-F]{6}$/.test(props[propName])) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Must be a valid color code`
      );
    }
    return null;
  },
  videoUrl: PropTypes.string,
  previewVideoUrl: PropTypes.string,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  runTime: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  released: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
});

const movieCollectionValidator = PropTypes.arrayOf(movieValidator);

const reviewValidator = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
});

const reviewCollectionValidator = PropTypes.arrayOf(reviewValidator);

const appValidator = {
  films: movieCollectionValidator,
  reviews: reviewCollectionValidator,
};

const Validator = {
  MOVIE: movieValidator,
  MOVIES: movieCollectionValidator,
  APP: appValidator,
  REVIEW: reviewValidator,
  REVIEWS: reviewCollectionValidator,
};

export default Validator;
