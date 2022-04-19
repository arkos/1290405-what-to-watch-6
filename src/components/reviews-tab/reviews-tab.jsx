import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "../../store/api-actions";
import { getReviewsForMovie } from "../../store/selectors/selectors";
import Validator from "../../util/validate";
import ReviewItem from "../review-item/review-item";

const ReviewsTab = ({ movie }) => {
  const reviews = useSelector((state) => getReviewsForMovie(state, movie.id));

  const dispatch = useDispatch();

  useEffect(() => {
    if (!reviews) {
      dispatch(fetchReviews(movie));
    }
  }, [dispatch, movie, reviews]);

  if (!reviews) {
    return <div className="review">Loading reviews...</div>;
  }

  const secondColumnIndex = Math.ceil(reviews.length / 2);

  return (
    <div className="movie-card__reviews movie-card__row">
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
    </div>
  );
};

ReviewsTab.propTypes = {
  movie: Validator.MOVIE,
};

export default ReviewsTab;
