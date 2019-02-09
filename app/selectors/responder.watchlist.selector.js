import { createSelector } from 'reselect';

const responderWatchlistRecord = store => store.responderwatchlist;

export const getSeculacerWatchList = createSelector(
  [responderWatchlistRecord],
  seculacer => seculacer.seculacersList,
);