import {
    SET_SECULACERS_WATCHLIST,
    UPDATE_WATCHLIST,
} from './responder.watchlist.action';

const initialState = {
    seculacersList : [],
};
class ResponderEDMsReducer {
    reducer = (state = initialState, action) => {
        switch (action.type) {
            case SET_SECULACERS_WATCHLIST: {
                return {...state , seculacersList : action.seculacersList };
            }
            case UPDATE_WATCHLIST : {
                const { newEDM } = action;
                const newEDMList = state.seculacersList.map(seculacer => {
                    if(seculacer.id === newEDM.id) {
                        return {
                            ...seculacer,
                            ...newEDM,
                        };
                    }
                    return seculacer;
                });
                return {...state , seculacersList : newEDMList };   
            }
            default: {
                return state;
            }
        }
    };
}

export default new ResponderEDMsReducer();
