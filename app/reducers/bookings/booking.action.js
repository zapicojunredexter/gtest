export const UPDATE_MAKE_BOOKING = 'UPDATE_MAKE_BOOKING';

export const SET_USER_BOOKINGS = 'SET_USER_BOOKINGS';

class BookingAction {
    updateMakeBooking = makeBooking => dispatch => 
        dispatch({
            type : UPDATE_MAKE_BOOKING,
            makeBooking
        });

    setUserBookings = userBookings => dispatch =>
        dispatch({
            type: SET_USER_BOOKINGS,
            userBookings
        })
}

export default new BookingAction();
