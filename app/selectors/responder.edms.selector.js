import { createSelector } from 'reselect';

const responderEDMsRecord = store => store.responderedms;

export const getEDMs = createSelector(
  [responderEDMsRecord],
  edms => edms.seculacersList,
);