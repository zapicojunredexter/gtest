export const SET_CONTACTS = 'SET_CONTACTS';

export const ADD_CONTACT = 'ADD_CONTACT';

export const DELETE_CONTACT = 'DELETE_CONTACT';

export const EDIT_CONTACT = 'EDIT_CONTACT';

class ContactsAction {
  setContacts = (contacts) => (dispatch) =>
    dispatch({
      type: SET_CONTACTS,
      contacts,
    });

    addContact = (contact) => (dispatch) =>
        dispatch({
            type: ADD_CONTACT,
            contact,
        });

    deleteContact = (contactId) => (dispatch) =>
        dispatch({
            type: DELETE_CONTACT,
            contactId,
        });

    editContact = (contact) => (dispatch) =>
        dispatch({
            type: EDIT_CONTACT,
            contact,
        });
}
export default new ContactsAction();
