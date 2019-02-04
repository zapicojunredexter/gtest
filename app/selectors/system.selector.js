
import { createSelector } from 'reselect';

const systemRecord = store => store.system;

export const getCurrentPath = createSelector(
  [systemRecord],
  system => system.path,
);