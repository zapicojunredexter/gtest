import firebase from 'react-native-firebase';
import BookingsAction from '../reducers/bookings/booking.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';

class BookingsService {
    addBooking = (bookingDetails) => async (dispatch, getState) => {
        // TODO should be call to api
        const userId = getState().user.Id;
        const firebaseRef = new CollectionInfrastructure(firebase,'Bookings');
        const toBeAdded = {
            ...bookingDetails,
            CommuterId : userId,
            Status : 'Upcoming',
        }
        await firebaseRef.create(toBeAdded);
    }

    listenUserBookings = () => async (dispatch, getState) => {
        const { user } = getState();

        const ref = firebase.firestore().collection('Bookings')
            .where("CommuterId","==",user.Id);
        ref.onSnapshot(results => {
            const bookings = results.docs.map(data => data.data());
            dispatch(BookingsAction.setUserBookings(bookings));
        })
        // const results = await ref.get();

        // const bookings = results.docs.map(data => data.data());
        // dispatch(BookingsAction.setUserBookings(bookings));
        // return true;
    }

}

export default new BookingsService();
