import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeDataProcessingState} from '../../store/action';
import {postReview} from '../../store/api-actions';
import {State} from '../../util/const';
import Validator from '../../util/validate';

const STARS_COUNT = 10;
const DEFAULT_RATING = `8`;
const REVIEW_TEXT_LENGTH_MIN = 50;
const REVIEW_TEXT_LENGTH_MAX = 400;

const AddReviewForm = ({movie}) => {
  const [reviewForm, setReviewForm] = useState({
    rating: DEFAULT_RATING,
    reviewText: ``
  });

  const [formState, setFormState] = useState({
    isSaving: false,
    isDisabled: false,
    isAborting: false,
    isValid: false
  });

  const dispatch = useDispatch();

  const {dataProcessingState} = useSelector((state) => state.MOVIE);

  const validateReviewText = () => {
    return reviewForm.reviewText.length >= REVIEW_TEXT_LENGTH_MIN &&
      reviewForm.reviewText.length <= REVIEW_TEXT_LENGTH_MAX;
  };

  const validateRating = () => {
    return reviewForm.rating !== null;
  };

  const validateAll = () => {
    return validateReviewText() && validateRating();
  };

  useEffect(() => {
    dispatch(changeDataProcessingState(State.DEFAULT));
  }, []);

  useEffect(() => {
    setFormState({
      ...formState,
      isValid: validateAll()
    });
  }, [reviewForm]);

  useEffect(() => {
    setFormState({
      ...formState,
      isSaving: dataProcessingState === State.SAVING,
      isDisabled: dataProcessingState === State.SAVING,
      isAborting: dataProcessingState === State.ABORTING
    });
  }, [dataProcessingState]);


  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(postReview({
      rating: parseInt(reviewForm.rating, 10),
      comment: reviewForm.reviewText
    }, movie.id));
  };

  const handleRatingChange = (evt) => {
    const {name, value} = evt.target;
    setReviewForm({...reviewForm, [name]: value});
  };

  const handleReviewTextChange = (evt) => {
    setReviewForm({...reviewForm, reviewText: evt.target.value});
  };

  const createRadioButtonStars = (count = STARS_COUNT) => {
    const radioButtonStars = new Array(count).fill(null);

    return radioButtonStars.map((_, index) => {
      const serialId = (index + 1).toString();
      return <React.Fragment key={serialId}>
        <input className="rating__input"
          id={`star-${serialId}`}
          type="radio"
          name="rating"
          value={serialId}
          checked={rating === serialId}
          disabled={`${formState.isDisabled ? `disabled` : ``}`}
          onChange={handleRatingChange} />
        <label className="rating__label" htmlFor={`star-${serialId}`}>Rating {serialId}</label>
      </React.Fragment>;
    }
    );
  };

  const {rating, reviewText} = reviewForm;

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating" disabled={`${formState.isDisabled ? `disabled` : ``}`}>
        <div className="rating__stars">
          {createRadioButtonStars()}
        </div>
      </div>

      <div className="add-review__text" disabled={`${formState.isDisabled ? `disabled` : ``}`}>
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={handleReviewTextChange} value={reviewText}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={`${!formState.isValid || formState.isDisabled ? `disabled` : ``}`}>{`${formState.isSaving ? `Sending...` : `Post`}`}</button>
        </div>

      </div>
      {formState.isAborting && <p>Unable to send your review right now. Please try again later</p>}
    </form>
  );
};

AddReviewForm.propTypes = {
  movie: Validator.MOVIE
};

export default AddReviewForm;
