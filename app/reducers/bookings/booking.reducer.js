import {
    UPDATE_MAKE_BOOKING
} from './booking.action';

class ScheduleReducer {
    reducer = (state = {
        makeBooking : {
            to : null,
            from : null,
            schedule : null,
            date : null
        }
    }, action ) => {
        switch (action.type) {
            case UPDATE_MAKE_BOOKING: {
                return { ...state, makeBooking : {
                    ...state.makeBooking,
                    ...action.makeBooking
                } };
            }
            default: {
                return state;
            }
        }
    };
}

export default new ScheduleReducer();
