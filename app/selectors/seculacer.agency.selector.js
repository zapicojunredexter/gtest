import { createSelector } from 'reselect';

const agenciesRecord = store => store.agencies;

export const getAgencies = createSelector(
  [agenciesRecord],
  agency => agency.agencies,
);