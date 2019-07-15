import firebase from 'react-native-firebase';
import RequestService from './request.service';
import UserAction from '../reducers/user/user.action';
import { responseToJson } from '../utils/parsing.helper';

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
        if(this.listening){
            this.listening();
            this.listening = null;
        }
    }

    updateContactNumber = (contactNumber) => async (dispatch, getState) => {
        try{
            const { user } = getState();
            const notifToken = await firebase.messaging().getToken();
            const result = await RequestService.put(`users/${user.Id}`, {
                ContactNumber: contactNumber,
                notifToken
            });
            const jsonResult = await responseToJson(result);
            console.log('ADUNA', jsonResult);
            return jsonResult;
        }catch(error){
            console.error(error);
        }
    }

}

export default new UserService();
