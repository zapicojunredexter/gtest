export const SET_SECULACERS = 'SET_SECULACERS';

class ResponderLocations {
    setSeculacersList = (seculacersList) => (dispatch) =>
        dispatch({
            type: SET_SECULACERS,
            seculacersList,
        });
}
export default new ResponderLocations();
