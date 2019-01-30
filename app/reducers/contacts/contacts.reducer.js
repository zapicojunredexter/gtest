import { SET_CONTACTS, ADD_CONTACT, DELETE_CONTACT } from './contacts.action';

const initialState = {
    contactList : [],
};
class ContactsReducer {
    reducer = (state = initialState, action) => {
        switch (action.type) {
            case SET_CONTACTS: {
                return {...state , contactList : action.contacts };
            }
            case ADD_CONTACT : {
                const newContactList = state.contactList.concat(action.contact);
                return {...state , contactList : newContactList };
            }
            case DELETE_CONTACT : {
                const newContactList = state.contactList.filter(contact => JSON.stringify(contact) != action.contactId);
                return {...state , contactList : newContactList };
            }
            default: {
                return state;
            }
        }
    };
}

export default new ContactsReducer();
