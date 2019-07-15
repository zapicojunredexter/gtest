import firebase from 'react-native-firebase';
import ErrorMessages from '../error.messages';
import RequestService from '../../services/request.service';
import { responseToJson } from '../../utils/parsing.helper';

class AuthInfrastructure {
    login = async (username, password) => {
        const res = await firebase.auth().signInWithEmailAndPassword(username, password).catch(error => { throw error });

        const authObject = res.user;
        const { uid } = authObject;
    
        const ref = this.getCollection().doc(uid);
        const userResponse = await ref.get();

        return userResponse.data();
    }

    registerAccount = async (username, password, params) => {
        if(!firebase.auth().currentUser) {
            const registeredUser = await firebase.auth().createUserWithEmailAndPassword(username, password).catch((error) => { throw error });
        }
        const res = !firebase.auth().currentUser ? registeredUser.user : firebase.auth().currentUser;
        const authObject = res;
        const { uid } = authObject;

        try{
            const notifToken = await firebase.messaging().getToken();
            const toBeAdded = {
                ...params,
                email: username,
                notifToken,
            };
            const result = await RequestService.post(`users/${uid}`, toBeAdded);
            const jsonResult = await responseToJson(result);
            return jsonResult;
        }catch(error){
            throw error;
        }
    };

    getStore = () => firebase.firestore();

    getCollection = () => this.getStore().collection('Users');
}

export default new AuthInfrastructure();
