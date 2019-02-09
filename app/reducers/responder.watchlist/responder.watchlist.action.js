export const SET_SECULACERS_WATCHLIST = 'SET_SECULACERS_WATCHLIST';

export const UPDATE_WATCHLIST = 'UPDATE_WATCHLIST';

class ResponderWatchlist {
    setSeculacersList = (seculacersList) => (dispatch) =>
        dispatch({
            type: SET_SECULACERS_WATCHLIST,
            seculacersList,
        });

    updateWatchlist = (newEDM) => (dispatch) =>
        dispatch({
            type: UPDATE_WATCHLIST,
            newEDM,
        });
}
export default new ResponderWatchlist();
