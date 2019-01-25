import { createSelector } from 'reselect';

const userRecord = store => store.user;

export const getUser = createSelector(
  [userRecord],
  user => user,
);