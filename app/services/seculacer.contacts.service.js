import ContactsAction from '../reducers/seculacer.contacts/seculacer.contacts.action';

const makeid = () => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (let i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

class ContactsService {
    fetchContacts = (newUser) => (dispatch) => {
        //TODO fetch contacts from back end
        const contacts = [];
        dispatch(ContactsAction.setContacts(contacts));
    };

    addContact = (contact) => dispatch => {
        // TODO send to back end
        const newContact = {
            ...contact,
            isFav : false,
            id : makeid()
        }
        dispatch(ContactsAction.addContact(newContact));
    }

    editContact = (contact) => dispatch => {
        //TODO edit in back end also
        dispatch(ContactsAction.editContact(contact));
    }

    deleteContact = (contactId) => dispatch => {
        // TODO delete back end
        dispatch(ContactsAction.deleteContact(contactId));
    }

}

export default new ContactsService();
