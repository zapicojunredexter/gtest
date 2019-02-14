export const SET_SEARCH_AGENCIES = 'SET_SEARCH_AGENCIES';

class AgenciesActions {
    setAgencies = (agencies) => (dispatch) =>
        dispatch({
            type: SET_SEARCH_AGENCIES,
            agencies,
        });
}
export default new AgenciesActions();
