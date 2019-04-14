import firebase from 'react-native-firebase';
import UserAction from '../reducers/user/user.action';

class UserService {
    listenUser  = () => (dispatch, getState) => {
        // dispatch(UserAction.setUser());
        const { currentUser } = firebase.auth();
        if(!currentUser){
            throw new Error("Listening for user updates with no User");
        }
        if(this.listening){
            this.cancelListening();
        }else{
            this.listening = firebase.firestore()
                .collection('Users')
                .doc(currentUser.uid)
                .onSnapshot(user => {
                    const userData = user.data();
                    dispatch(UserAction.setUser(userData));
                })
        }
    }

    cancelListening = () => () => {
        console.log("CANCELLED USER LISTENER", this.listening);
        if(this.listening){
            this.listening();
            this.listening = null;
        }
    }

    updateContactNumber = (contactNumber) => async (dispatch, getState) => {
        const { user } = getState();

        await firebase.firestore().collection('Users').doc(user.Id).set({
            ContactNum: contactNumber
        }, { merge: true });
        // dispatch(UserAction.updateContactNumber(contactNumber));

        return true;
    }

}

export default new UserService();
