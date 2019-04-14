import firebase from 'react-native-firebase';
import UserAction from '../reducers/user/user.action';

class UserService {
    updateContactNumber = (contactNumber) => async (dispatch, getState) => {
        const { user } = getState();

        await firebase.firestore().collection('Users').doc(user.Id).set({
            ContactNum: contactNumber
        }, { merge: true });
        dispatch(UserAction.updateContactNumber(contactNumber));

        return true;
    }

}

export default new UserService();
