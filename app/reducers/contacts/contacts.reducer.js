import {
    SET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    EDIT_CONTACT
} from './contacts.action';


const makeid = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

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
                const newContactList = state.contactList.concat({
                    ...action.contact,
                    isFav : false,
                    id : makeid()
                });
                return {...state , contactList : newContactList };
            }
            case DELETE_CONTACT : {
                const newContactList = state.contactList.filter(contact => contact.id != action.contactId);
                return {...state , contactList : newContactList };
            }
            case EDIT_CONTACT : {
                const newContactList = state.contactList.map(contact => {
                    if(contact.id === action.contact.id){
                        return action.contact;
                    }
                    return contact;
                });
                return {...state , contactList : newContactList };
            }
            default: {
                return state;
            }
        }
    };
}

export default new ContactsReducer();
