import {
    SET_NOTIFICATIONS
} from './notifications.action';

const initialState = {
    notifications : [],
};
class NotificationsReducer {
    reducer = (state = initialState, action) => {
        switch (action.type) {
            case SET_NOTIFICATIONS: {
                return {...state , notifications : action.notifications };
            }
            default: {
                return state;
            }
        }
    };
}

export default new NotificationsReducer();
