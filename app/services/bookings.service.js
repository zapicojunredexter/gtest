import firebase from 'react-native-firebase';
import BookingsAction from '../reducers/bookings/booking.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';
import ScheduleAction from '../reducers/schedules/schedule.action';
import TripAction from '../reducers/trips/trip.action';
import { API_URL } from '../constants/api';

class BookingsService {
    approveBooking = bookingId => async(dispatch, getState) => {
        alert("TODO: API APPROVE BOOKING "+bookingId);
    }

    cancelBooking = bookingId => async(dispatch, getState) => {
        alert("TODO: API CANCEL BOOKING "+bookingId);
    }

    addBooking = (bookingDetails) => async (dispatch, getState) => {
        // TODO should be call to api
        const userId = getState().user.Id;
        const firebaseRef = new CollectionInfrastructure(firebase,'Bookings');
        const toBeAdded = {
            ...bookingDetails,
            CommuterId : userId,
            Status : 'Upcoming',
        }
        alert(JSON.stringify(toBeAdded));
        // await firebaseRef.create(toBeAdded);
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
                const travelingBooking = bookings.find(booking => booking.Status === 'Travelling');

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
                            if(tripData.Status === 'Finished'){
                                console.log("FINISHED !",tripData);
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
