import {
    SET_SECULACERS_EDM,
    UPDATE_EDM
} from './responder.edms.action';

const initialState = {
    seculacersList : [],
};
class ResponderEDMsReducer {
    reducer = (state = initialState, action) => {
        switch (action.type) {
            case SET_SECULACERS_EDM: {
                return {...state , seculacersList : action.seculacersList };
            }
            case UPDATE_EDM : {
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
