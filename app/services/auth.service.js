import firebase from 'react-native-firebase';
import UserActions from '../reducers/user/user.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';
import AuthInfrastructure from '../modules/infrastructures/auth.infrastructure';
import CombineService from './combine.service';

const firebaseRef = new CollectionInfrastructure(firebase,'Users');

class AuthService {
    login = (username, password) => async (dispatch, getState) => {
        console.log('starting');
        const loggedInUser = await AuthInfrastructure.login(username, password);
        console.log('starting1');
        if(!loggedInUser){
            throw new Error('User does not exists');
        }
        console.log('starting2');
        dispatch(UserActions.setUser(loggedInUser));
    };

    logout = () => async (dispatch, getState) => {
        await firebase.auth().signOut().catch(error => { throw error });
        dispatch(UserActions.setUser({}));
        dispatch(CombineService.cancelListeners());
    }

    registerAccount = (username, passsword, params) => async (dispatch, getState) => {

        await AuthInfrastructure.registerAccount(username, passsword, params).catch(error => { throw error });

        const user  = {
            username,
            passsword,
            ...params
        };

        dispatch(UserActions.setUser(user));
    }

}

export default new AuthService();
