export const SET_TERMINALS = 'SET_TERMINALS';

class SystemAction {
    setTerminals = terminals => dispatch => 
        dispatch({
            type : SET_TERMINALS,
            terminals
        });

}

export default new SystemAction();
