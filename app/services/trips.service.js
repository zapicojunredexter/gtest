import firebase from 'react-native-firebase';
import TripsAction from '../reducers/trips/trip.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';

class TripsService {
    listening;

    fetchFreshTripData = tripId => async (dispatch, getState) => {
        alert("TOODO CALL API"+tripId);
        const testResponse = {
            Status: 'Travelling',
            Id: 'testId',
            Schedule: 'testSchedule',
            TripDate: 'testTripDate',
            Driver: {
                Name: 'Don Tiburcio',
            },
            Vehicle: {
                PlateNumber: '12345'
            },
            commuters: [
                {
                    Id : '1234',
                    Name : 'Junre',
                    ContactNumber : '12345',
                },
                {
                    Id : '12345',
                    Name : 'Dexter',
                    ContactNumber : '12345',
                },
                {
                    Id : '123456',
                    Name : 'Zapico',
                    ContactNumber : '12345',
                }
            ]
        };
        dispatch(TripsAction.setSelectedDriverTrip(testResponse));
    }

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
