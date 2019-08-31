import firebase from 'react-native-firebase';
import BookingsAction from '../reducers/bookings/booking.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';
import ScheduleAction from '../reducers/schedules/schedule.action';
import TripAction from '../reducers/trips/trip.action';
import { API_URL } from '../constants/api';
import RequestService from './request.service';
import { responseToJson } from '../utils/parsing.helper';

class BookingsService {
    approveBooking = bookingId => async(dispatch, getState) => {
        try{
            const result = await RequestService.put(`bookings/${bookingId}`,{ Status: 'Travelling', });
            return responseToJson(result);
        }catch(error){
            console.error(error);
        }
    }

    cancelBooking = bookingId => async(dispatch, getState) => {
        try{
            const result = await RequestService.put(`bookings/cancel/${bookingId}`);
            return responseToJson(result);
        }catch(error){
            console.error(error);
        }
    }

    fetchBookingDetails = bookingId => async (dispatch, getState) => {
        try{
            const result = await RequestService.get(`bookings/${bookingId}`);
            return responseToJson(result);
        }catch(error){
            console.error(error);
        }
    }

    addBooking = (bookingDetails) => async (dispatch, getState) => {
        try{
            const userId = getState().user.Id;
            const toBeAdded = {
                ...bookingDetails,
                CommuterId : userId,
            }
            const result = await RequestService.post('bookings', toBeAdded);
            return responseToJson(result);
        }catch(error){
            console.error(error);
        }
    }

    listenUserBookings = () => async (dispatch, getState) => {
        const { user } = getState();

        const ref = firebase.firestore().collection('Bookings')
            .where("CommuterId","==",user.Id);

        this.cancelListening();
        ref.onSnapshot(results => {
            const bookings = results.docs.map(data => data.data());
            dispatch(BookingsAction.setUserBookings(bookings));
                
        });
    }

    cancelListening = () => () => {
        if(this.listening){
            this.listening();
            this.listening = null;
        }
    }

    cancelTravelSchedule = () => () => {

    }

}

export default new BookingsService();
