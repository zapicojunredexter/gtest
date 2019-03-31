import {
    SET_TERMINALS,
} from './terminals.action';

class TerminalsReducer {
    reducer = (state = [], action ) => {
        switch (action.type) {
            case SET_TERMINALS: {
                return {...state, ...action.terminals};
            }
            default: {
                return state;
            }
        }
    };
}

export default new TerminalsReducer();
