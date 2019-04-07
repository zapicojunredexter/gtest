import firebase from 'react-native-firebase';
import TripsAction from '../reducers/trips/trip.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';

class RoutesService {
    listening;

    listenTrips = (schedId) => async (dispatch, getState) => {
        // K26BCPIwZGv9JflFCaod
        //
        dispatch(this.unlistenTrips());
    
        const firebaseRef = firebase.firestore().collection('Trips').where('ScheduleId', '==', schedId);
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
}

export default new RoutesService();
