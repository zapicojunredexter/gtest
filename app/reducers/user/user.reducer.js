import {
    SET_USER
} from './user.action';

class UserReducer {
    reducer = (state = {}, action ) => {
        switch (action.type) {
            case SET_USER: {
                return {...action.user};
            }
            default: {
                return state;
            }
        }
    };
}

export default new UserReducer();
