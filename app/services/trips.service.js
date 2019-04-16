import firebase from 'react-native-firebase';
import TripsAction from '../reducers/trips/trip.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';

class TripsService {
    listening;

    listenTrips = (tripDate) => async (dispatch, getState) => {
        dispatch(this.unlistenTrips());
        const firebaseRef = firebase.firestore()
            .collection('Trips')
            .where('TripDate', '==', tripDate);
        this.listening = firebaseRef.onSnapshot(querySnapshot => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            dispatch(TripsAction.setTrips(data));
        });

    }

    unlistenTrips = () => (dispatch, getState) => {
        if(this.listening){
            this.listening();
            this.listening = null;   
        }
    }


    listenDriverTrips = () => (dispatch, getState) => {
        const { user } = getState();

        dispatch(this.unlistenTrips());
        const firebaseRef = firebase.firestore()
            .collection('Trips')
            .where('Driver.Id', '==', user.Id);
        this.listening = firebaseRef.onSnapshot(querySnapshot => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            dispatch(TripsAction.setTrips(data));
        });
    } 
}

export default new TripsService();
