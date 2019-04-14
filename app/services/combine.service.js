import firebase from 'react-native-firebase';
import UserService from './user.service';
import bookingsService from './bookings.service';
class CombineServices {
    masterSnap = () => async (dispatch, getState) => {
        dispatch(UserService.listenUser());
        dispatch(bookingsService.listenUserBookings());
    }
}

export default new CombineServices();
