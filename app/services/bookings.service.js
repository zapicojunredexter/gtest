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
            console.log('dadadada', toBeAdded);
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

        if(this.listening){
            this.cancelListening();
        }else{
            ref.onSnapshot(results => {
                const bookings = results.docs.map(data => data.data());
                dispatch(BookingsAction.setUserBookings(bookings));
                /*
                const travelingBooking = bookings.find(booking => booking && booking.Status === 'Travelling');

                if(travelingBooking) {
                    if(this.tripSnapshot){
                        console.log("REMOVED LISTENER former");
                        this.tripSnapshot();
                        this.tripSnapshot = null;
                    }
                    // TODO should be in api. query route and schedule details
                    const testResponse = {
                        DepartureTime : '10:00:00',
                        TripDate : '04-14-2019',
                        Driver : {
                            Id : '123',
                            Name : 'TESTERRRR DRIVER'
                        },
                        Routes : {
                            From : [
                                123.9056,
                                10.2925
                            ],
                            To : [
                                123.8907,
                                10.3168,
                            ],
                        },
                    };

                    this.tripSnapshot = firebase.firestore().collection('Trips')
                        .doc(travelingBooking.TripId)
                        .onSnapshot(trip => {
                            const tripData = trip.data();
                            console.log("before 2!",tripData);
                            if(tripData.Status === 'Finished'){
                                if(this.tripSnapshot){
                                    console.log("REMOVED LISTENER");
                                    this.tripSnapshot();
                                    this.tripSnapshot = null;
                                }
                            }else{
                                console.log("NAGUPDATE SI TRIP", tripData);
                                dispatch(TripAction.setTravellingTrip(tripData));
                            }
                        })

                }
                */
            })
        }
    }

    cancelListening = () => () => {
        console.log("CANCELLED BOOKING LISTENER",this.listening);
        if(this.listening){
            this.listening();
            this.listening = null;
        }
    }

    cancelTravelSchedule = () => () => {

    }

}

export default new BookingsService();
