export const SET_SECULACERS_EDM = 'SET_SECULACERS_EDM';

export const UPDATE_EDM = 'UPDATE_EDM';

class ResponderEDMS {
    setSeculacersList = (seculacersList) => (dispatch) =>
        dispatch({
            type: SET_SECULACERS_EDM,
            seculacersList,
        });

    updateEDMs = (newEDM) => (dispatch) =>
        dispatch({
            type: UPDATE_EDM,
            newEDM,
        });
}
export default new ResponderEDMS();
