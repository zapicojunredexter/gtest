import firebase from 'react-native-firebase';
import TripsAction from '../reducers/trips/trip.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';

import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';

class TripsService {
    listening;

    fetchFreshTripData = tripId => async (dispatch, getState) => {
        /*
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
            Bookings: [
                {
                    Id : '1234',
                    Name : 'Junre',
                    ContactNumber : '12345',
                    Status: 'Waiting',
                },
                {
                    Id : '12345',
                    Name : 'Dexter',
                    ContactNumber : '12345',
                    Status: 'Waiting',
                },
                {
                    Id : '123456',
                    Name : 'Zapico',
                    ContactNumber : '12345',
                    Status: 'Waiting',
                },
                {
                    Id : '123456',
                    Name : 'Zapico',
                    ContactNumber : '12345',
                    Status: 'Cancelled',
                },
                {
                    Id : '123456',
                    Name : 'Zapico',
                    ContactNumber : '12345',
                    Status: 'Travelling',
                },
            ]
        };
        dispatch(TripsAction.setSelectedDriverTrip(testResponse));
        */
        try{
            const result = await RequestService.get(`trips/${tripId}`);
            const jsonResult = await responseToJson(result);
            dispatch(TripsAction.setSelectedDriverTrip(jsonResult));
            return jsonResult;
        }catch(error){
            console.error(error);
        }
    }

    listenTrips = (tripDate, selectedRouteId) => async (dispatch, getState) => {
        dispatch(this.unlistenTrips());
        dispatch(TripsAction.setTrips([]));
        const firebaseRef = firebase.firestore()
            .collection('Trips')
            .where('Schedule.DepartDate', '==', tripDate);
        this.listening = firebaseRef.onSnapshot(querySnapshot => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });

            const filtered = data.filter(res => res.Route.Id === selectedRouteId);
            
            dispatch(TripsAction.setTrips(filtered));
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

    startTrip = (tripId) => async (dispatch, getState) => {
        try{
            const result = await RequestService.put(`trips/${tripId}`, {Status: 'Travelling'});
            const jsonResult = await responseToJson(result);
            return jsonResult;
        }catch(error){
            console.error(error);
        }
    }

    finishTrip = (tripId) =>  async (dispatch, getState) => {
        try{
            const result = await RequestService.put(`trips/finish/${tripId}`, {Status: 'Finished'});
            const jsonResult = await responseToJson(result);
            return jsonResult;
        }catch(error){
            console.error(error);
        }
    }
}

export default new TripsService();
