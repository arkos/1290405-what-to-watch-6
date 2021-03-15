import React, {useState, useEffect} from 'react';

const STARS_COUNT = 10;
const DEFAULT_RATING = `8`;
const REVIEW_TEXT_LENGTH_MIN = 50;
const REVIEW_TEXT_LENGTH_MAX = 400;

const AddReviewForm = ({movie}) => {
  const [reviewForm, setReviewForm] = useState({
    rating: DEFAULT_RATING,
    reviewText: ``
  });

  const [isValid, setIsValid] = useState(false);

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
    setIsValid(validateAll());
  }, [reviewForm]);


  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  const handleRatingChange = (evt) => {
    const {name, value} = evt.target;
    setReviewForm({...reviewForm, [name]: value});
    setIsValid(validateAll());
  };

  const handleReviewTextChange = (evt) => {
    setReviewForm({...reviewForm, reviewText: evt.target.value});
    setIsValid(validateAll());
  };

  const createRadioButtonStars = (count = STARS_COUNT) => {
    const radioButtonStars = new Array(count).fill(null);

    return radioButtonStars.map((_, index) => {
      const serialId = (index + 1).toString();
      return <React.Fragment key={serialId}>
        <input className="rating__input" id={`star-${serialId}`} type="radio" name="rating" value={serialId} checked={rating === serialId} onChange={handleRatingChange} />
        <label className="rating__label" htmlFor={`star-${serialId}`}>Rating {serialId}</label>
      </React.Fragment>;
    }
    );
  };

  const {rating, reviewText} = reviewForm;

  return (
    <form action="#" className="add-review__form" onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          {createRadioButtonStars()}
        </div>
      </div>

      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={handleReviewTextChange} value={reviewText}></textarea>
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={`${!isValid ? `disabled` : ``}`}>Post</button>
        </div>

      </div>
    </form>
  );
};

export default AddReviewForm;
