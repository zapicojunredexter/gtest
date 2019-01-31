import { createSelector } from 'reselect';

const whitePaneRecord = store => store.whitepane;

export const getEdmPreferred = createSelector(
  [whitePaneRecord],
  whitePane => whitePane.edmPreferred,
);


export const getTemplateMessage = createSelector(
    [whitePaneRecord],
    whitePane => whitePane.templateMessage,
  );
