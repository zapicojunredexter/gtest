import firebase from 'react-native-firebase';

import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';

const firebaseRef = new CollectionInfrastructure(firebase,'Users');

class AuthService {
    login = (params) => async (dispatch, getState) => {
    };

    registerAccount = (params) => async (dispatch, getState) => {
        
        // const res = firebaseRef.create(params);
        // console.log("ARA", res, 'Users');

        // firebaseRef.read();

        // firebaseRef.update(params,'testId');
        console.log("IN");
        // await firebaseRef.delete('testId').catch(error => { throw error });
        
        firebaseRef.listen(data => {
            console.log("SAMANA",data);
        });
        console.log("OUT");
        // const firebaseRef = firebase.firestore().collection('todos');
        // this.ref.add({
        //     title: 'test title',
        //     complete: false,
        //   });

        //   this.ref.onSnapshot(this.onCollectionUpdate)
    }

}

export default new AuthService();
