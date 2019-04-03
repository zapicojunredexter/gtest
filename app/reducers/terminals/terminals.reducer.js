import {
    SET_TERMINALS,
} from './terminals.action';

class TerminalsReducer {
    reducer = (state = [], action ) => {
        switch (action.type) {
            case SET_TERMINALS: {
                return action.terminals;
            }
            default: {
                return state;
            }
        }
    };
}

export default new TerminalsReducer();
