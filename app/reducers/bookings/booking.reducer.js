import {
    UPDATE_MAKE_BOOKING,
    SET_USER_BOOKINGS,
} from './booking.action';

class ScheduleReducer {
    reducer = (state = {
        // makeBooking : {
        //     to : null,
        //     from : null,
        //     schedule : null,
        //     date : null
        // }
        userBookings : []
    }, action ) => {
        switch (action.type) {
            case UPDATE_MAKE_BOOKING: {
                return { ...state, makeBooking : {
                    ...state.makeBooking,
                    ...action.makeBooking
                } };
            }
            case SET_USER_BOOKINGS: {
                return {
                    ...state,
                    userBookings: action.userBookings
                }
            }
            default: {
                return state;
            }
        }
    };
}

export default new ScheduleReducer();
