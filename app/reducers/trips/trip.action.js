export const SET_TRIPS = 'SET_TRIPS';

export const SET_TRAVELLING_TRIP = 'SET_TRAVELLING_TRIP';

export const SET_SELECTED_DRIVER_TRIP = 'SET_SELECTED_DRIVER_TRIP';

class TripsAction {
    setTrips = trips => dispatch => 
        dispatch({
            type : SET_TRIPS,
            trips
        });
    setTravellingTrip = trip => dispatch =>
        dispatch({
            type: SET_TRAVELLING_TRIP,
            trip
        })
    setSelectedDriverTrip = trip => dispatch =>
        dispatch({
            type: SET_SELECTED_DRIVER_TRIP,
            trip
        })
}

export default new TripsAction();
