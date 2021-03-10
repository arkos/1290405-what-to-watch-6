import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchReviews} from '../../store/api-actions';
import Validator from '../../util/validate';
import ReviewItem from '../review-item/review-item';

const ReviewsTab = ({movie}) => {
  const {id} = movie;
  const {reviewsLoaded} = useSelector((state) => state.DATA);
  const isReviewLoaded = reviewsLoaded.find((loadedMovieId) => loadedMovieId === id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isReviewLoaded) {
      dispatch(fetchReviews(movie));
    }
  }, [isReviewLoaded]);

  if (!isReviewLoaded) {
    return (
      <h1>Loading reviews...</h1>
    );
  }

  const secondColumnIndex = Math.ceil(movie.reviews.length / 2);

  return (
    <div className="movie-card__reviews movie-card__row">
      <div className="movie-card__reviews-col">
        {movie.reviews.slice(0, secondColumnIndex)
          .map((review) => (<ReviewItem key={review.id} review={review}/>))}
      </div>
      {secondColumnIndex > 0 &&
      <div className="movie-card__reviews-col">
        {movie.reviews.slice(secondColumnIndex)
          .map((review) => <ReviewItem key={review.id} review={review}/>)}
      </div>}
    </div>
  );
};

ReviewsTab.propTypes = {
  movie: Validator.MOVIE
};

export default ReviewsTab;
