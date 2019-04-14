import {
    SET_USER,
    UPDATE_CONTACT_NUMBER
} from './user.action';

class UserReducer {
    reducer = (state = {}, action ) => {
        switch (action.type) {
            case SET_USER: {
                return {...action.user};
            }
            case UPDATE_CONTACT_NUMBER: {
                return {
                    ...state,
                    ContactNum: action.contactNum,
                }
            }
            default: {
                return state;
            }
        }
    };
}

export default new UserReducer();
