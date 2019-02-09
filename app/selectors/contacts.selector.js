import { createSelector } from 'reselect';

const contactsRecord = store => store.contacts;

export const getContactList = createSelector(
  [contactsRecord],
  contact => contact.contactList,
);

export const getFavContacts = createSelector(
    [contactsRecord],
    contact => contact.contactList.filter(cont => cont.isFav),
  );
  