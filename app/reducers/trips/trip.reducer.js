import {
    SET_TRIPS,
} from './trip.action';

class TripsReducer {
    reducer = (state = {
        trips : [],
    }, action ) => {
        switch (action.type) {
            case SET_TRIPS: {
                return {...state, trips : action.trips};
            }
            default: {
                return state;
            }
        }
    };
}

export default new TripsReducer();
