import firebase from 'react-native-firebase';
import UserService from './user.service';
import BookingsService from './bookings.service';
class CombineServices {
    masterSnap = () => async (dispatch, getState) => {
        dispatch(UserService.listenUser());
        dispatch(BookingsService.listenUserBookings());
    }

    cancelListeners = () => dispatch => {
        console.log("TO CANCEL LISTENERS MAIN");
        dispatch(UserService.cancelListening());
        dispatch(BookingsService.cancelListening());
    }
}

export default new CombineServices();
