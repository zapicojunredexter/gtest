getContactList

import { createSelector } from 'reselect';

const contactsRecord = store => store.contacts;

export const getContactList = createSelector(
  [contactsRecord],
  contact => contact.contactList,
);