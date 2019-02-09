import { createSelector } from 'reselect';

const reviewRecord = store => store.reviews;

export const getReviews = createSelector(
  [reviewRecord],
  reviews => reviews.reviews,
);