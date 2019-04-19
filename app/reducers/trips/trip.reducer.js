import {
    SET_TRIPS,
    SET_TRAVELLING_TRIP,
    SET_SELECTED_DRIVER_TRIP
} from './trip.action';

class TripsReducer {
    reducer = (state = {
        trips : [],
        travellingTrip : null,
        selectedDriverTrip : null,
    }, action ) => {
        switch (action.type) {
            case SET_TRIPS: {
                return {...state, trips : action.trips};
            }
            case SET_TRAVELLING_TRIP: {
                return { ...state, travellingTrip : action.trip };
            }
            case SET_SELECTED_DRIVER_TRIP: {
                return { ...state, selectedDriverTrip : action.trip };
            }
            default: {
                return state;
            }
        }
    };
}

export default new TripsReducer();
