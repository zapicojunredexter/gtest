export const SET_USER = 'SET_USER';

export const UPDATE_CONTACT_NUMBER = 'UPDATE_CONTACT_NUMBER';

class UserAction {
    setUser = user => dispatch => 
        dispatch({
            type : SET_USER,
            user
        });
    updateContactNumber = contactNum => dispatch =>
        dispatch({
            type : UPDATE_CONTACT_NUMBER,
            contactNum
        });

}

export default new UserAction();
