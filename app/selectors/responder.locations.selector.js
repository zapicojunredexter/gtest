
import { createSelector } from 'reselect';

const responderLocationRecord = store => store.responderlocation;

export const getLocations = createSelector(
    [responderLocationRecord],
    location => location.seculacersList,
);