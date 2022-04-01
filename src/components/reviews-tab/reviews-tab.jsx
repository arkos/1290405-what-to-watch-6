import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadReviews } from "../../store/action";
import { fetchReviews } from "../../store/api-actions";
import Validator from "../../util/validate";
import ReviewItem from "../review-item/review-item";

const ReviewsTab = ({ movie }) => {
  const isReviewLoaded = movie.reviews !== null && movie.reviews !== undefined;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadReviews(null, movie.id));
  }, []);

  useEffect(() => {
    if (!isReviewLoaded) {
      dispatch(fetchReviews(movie));
    }
  }, [isReviewLoaded]);

  if (!isReviewLoaded) {
    return <div className="review">Loading reviews...</div>;
  }

  const secondColumnIndex = Math.ceil(movie.reviews.length / 2);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {movie.reviews.slice(0, secondColumnIndex).map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>
      {secondColumnIndex > 0 && (
        <div className="movie-card__reviews-col">
          {movie.reviews.slice(secondColumnIndex).map((review) => (
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
