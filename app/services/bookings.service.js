import firebase from 'react-native-firebase';
import RoutesActions from '../reducers/routes/routes.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';

class RoutesService {
    addBooking = (bookingDetails) => async (dispatch, getState) => {
        // TODO should be call to api
        const userId = getState().user.Id;
        const firebaseRef = new CollectionInfrastructure(firebase,'Bookings');
        const toBeAdded = {
            ...bookingDetails,
            CommuterId : userId,
            Status : 'Reserved',
        }
        await firebaseRef.create(toBeAdded);
    }

    fetchCommuterHistory = () => async (dispatch, getState) => {
        const { user } = getState();

        // await firebase.firestore().collection('Users').doc(user.Id).set({
        //     ContactNum: contactNumber
        // }, { merge: true });
        const ref = firebase.firestore().collection('Bookings')
            .where("CommuterId","==",user.Id);
        const results = await ref.get();

        console.log("ZZZZZZ", results.docs.map(data => data.data()));
        return true;
    }

}

export default new RoutesService();
