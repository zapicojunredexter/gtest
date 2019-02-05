import {
    SET_SECULACERS
} from './responder.locations.action';

const initialState = {
    seculacersList : [],
};
class ResponderLocationsReducer {
    reducer = (state = initialState, action) => {
        switch (action.type) {
            case SET_SECULACERS: {
                return {...state , seculacersList : action.seculacersList };
            }
            default: {
                return state;
            }
        }
    };
}

export default new ResponderLocationsReducer();
