import firebase from 'react-native-firebase';
import UserService from './user.service';
import BookingsService from './bookings.service';
import TripsService from './trips.service';
import NotificationService from './notifications.service';

class CombineServices {
    masterSnap = () => async (dispatch, getState) => {
        dispatch(UserService.listenUser());
        dispatch(NotificationService.listenNotifications());

        const { user } = getState();
        if(user.AccountType === 'Commuter') {
            dispatch(BookingsService.listenUserBookings());
        } else {
            dispatch(TripsService.listenDriverTrips());
        }
    }

    cancelListeners = () => (dispatch, getState) => {
        dispatch(UserService.cancelListening());
        dispatch(NotificationService.unlistenNotifications());
        const { user } = getState();
        if(user.AccountType === 'Commuter') {
            dispatch(BookingsService.cancelListening());
        } else {
            dispatch(TripsService.unlistenTrips());
        }
    }
    
}

export default new CombineServices();
