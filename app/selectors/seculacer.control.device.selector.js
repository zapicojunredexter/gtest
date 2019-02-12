import { createSelector } from 'reselect';

const deviceRecord = store => store.device;

export const getDeviceSettings = createSelector(
  [deviceRecord],
  device => device,
);