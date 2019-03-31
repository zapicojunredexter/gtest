import firebase from 'react-native-firebase';
import UserActions from '../reducers/user/user.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';
import AuthInfrastructure from '../modules/infrastructures/auth.infrastructure';

const firebaseRef = new CollectionInfrastructure(firebase,'Users');

class AuthService {
    login = (username, password) => async (dispatch, getState) => {
        // const res = await firebase.auth().signInWithEmailAndPassword(username, password).catch(error => { throw error });
        return await AuthInfrastructure.login(username, password);
    };

    logout = () => async (dispatch, getState) => {
        await firebase.auth().signOut().catch(error => { throw error });
        dispatch(UserActions.setUser({}));
    }

    registerAccount = (username, passsword, params) => async (dispatch, getState) => {
        
        // const res = firebaseRef.create(params);
        // console.log("ARA", res, 'Users');

        // firebaseRef.read();

        // firebaseRef.update(params,'testId');
        console.log("IN");
        // await firebaseRef.delete('testId').catch(error => { throw error });
        
        // firebaseRef.listen(data => {
        //     console.log("SAMANA",data);
        // });
        console.log("OUT");
        // const firebaseRef = firebase.firestore().collection('todos');
        // this.ref.add({
        //     title: 'test title',
        //     complete: false,
        //   });

        //   this.ref.onSnapshot(this.onCollectionUpdate)

        // const res = await firebase.auth().createUserWithEmailAndPassword('testemail@gmail.com', 'testpassword').catch((error) => { throw error });
        // const userObject = res.user;

        // const addedUser = await firebaseRef.create({
        //     id : userObject.uid,
        //     test : "TEST",
        //     test1 : "TEST1"
        // }).catch(error => { throw error });

        // const addedUser = await firebaseRef.update({
        //     id : userObject.uid,
        //     test : "TEST",
        //     test1 : "TEST1"
        // }).catch(error => { throw error });
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
