export const UPDATE_MAKE_BOOKING = 'UPDATE_MAKE_BOOKING';


class BookingAction {
    updateMakeBooking = makeBooking => dispatch => 
        dispatch({
            type : UPDATE_MAKE_BOOKING,
            makeBooking
        });
}

export default new BookingAction();
