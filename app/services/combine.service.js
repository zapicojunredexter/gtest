import firebase from 'react-native-firebase';
import UserService from './user.service';
import BookingsService from './bookings.service';
import TripsService from './trips.service';

class CombineServices {
    masterSnap = () => async (dispatch, getState) => {
        dispatch(UserService.listenUser());

        const { user } = getState();
        if(user.AccountType === 'Communter') {
            dispatch(BookingsService.listenUserBookings());
        } else {
            dispatch(TripsService.listenDriverTrips());
        }
    }

    cancelListeners = () => dispatch => {
        dispatch(UserService.cancelListening());

        const { user } = getState();
        if(user.AccountType === 'Communter') {
            dispatch(BookingsService.cancelListening());
        } else {
            console.log("ZZZtt");
            dispatch(TripsService.unlistenTrips());
        }
    }
    
}

export default new CombineServices();
