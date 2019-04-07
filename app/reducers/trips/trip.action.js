export const SET_TRIPS = 'SET_TRIPS';

class TripsAction {
    setTrips = trips => dispatch => 
        dispatch({
            type : SET_TRIPS,
            trips
        });

}

export default new TripsAction();
