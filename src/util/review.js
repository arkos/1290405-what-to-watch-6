export const adaptToClient = (review) => {
  const adaptedReview = Object.assign({}, review, {
    date: review.date !== null ? new Date(review.date) : null
  });

  return adaptedReview;
};
