import {
    SET_TRIPS,
    SET_TRAVELLING_TRIP
} from './trip.action';

class TripsReducer {
    reducer = (state = {
        trips : [],
        travellingTrip : null,
    }, action ) => {
        switch (action.type) {
            case SET_TRIPS: {
                return {...state, trips : action.trips};
            }
            case SET_TRAVELLING_TRIP: {
                return { ...state, travellingTrip : action.trip };
            }
            default: {
                return state;
            }
        }
    };
}

export default new TripsReducer();
