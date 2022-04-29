import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../store/api-actions";
import { getReviewsForMovie } from "../../store/selectors/selectors";
import { StateStatus } from "../../util/const";
import Validator from "../../util/validate";
import ReviewItem from "../review-item/review-item";
import Spinner from "../spinner/spinner";

const SPINNER_COLOR = "#000000";
const SPINNER_SIZE = 10;

const ReviewsTab = ({ movie }) => {
  const reviews = useSelector((state) => getReviewsForMovie(state, movie.id));
  const [reviewsStatus, setReviewsStatus] = useState(StateStatus.IDLE);

  const dispatch = useDispatch();

  useEffect(() => {
    const getReviews = async () => {
      try {
        setReviewsStatus(StateStatus.WORKING);
        await dispatch(fetchReviews(movie)).unwrap();
        setReviewsStatus(StateStatus.SUCCEEDED);
      } catch (err) {
        setReviewsStatus(StateStatus.FAILED);
      }
    };

    if (reviewsStatus === StateStatus.IDLE) {
      getReviews();
    }
  }, [reviewsStatus, dispatch, movie]);

  let content;
  const secondColumnIndex = Math.ceil(reviews.length / 2);

  if (reviewsStatus === StateStatus.WORKING) {
    return (
      <>
        <div className="review">
          Loading reviews <Spinner color={SPINNER_COLOR} size={SPINNER_SIZE} />
        </div>
      </>
    );
  } else if (reviewsStatus === StateStatus.SUCCEEDED) {
    content = (
      <>
        <div className="movie-card__reviews-col">
          {reviews.slice(0, secondColumnIndex).map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
        </div>
        {secondColumnIndex > 0 && (
          <div className="movie-card__reviews-col">
            {reviews.slice(secondColumnIndex).map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        )}
      </>
    );
  } else if (reviewsStatus === StateStatus.FAILED) {
    content = <div className="review">Failed to load reviews</div>;
  }

  return <div className="movie-card__reviews movie-card__row">{content}</div>;
};

ReviewsTab.propTypes = {
  movie: Validator.MOVIE,
};

export default ReviewsTab;
