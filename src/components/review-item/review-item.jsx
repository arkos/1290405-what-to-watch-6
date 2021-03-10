import React from 'react';
import {formatDate} from '../../util/common';
import Validator from '../../util/validate';

const ReviewItem = ({review}) => {
  const {comment, user, date, rating} = review;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={`${formatDate(date, `YYYY-MM-DD`)}`}>{formatDate(date, `MMMM D, YYYY`)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

ReviewItem.propTypes = {
  review: Validator.REVIEW
};

export default ReviewItem;
