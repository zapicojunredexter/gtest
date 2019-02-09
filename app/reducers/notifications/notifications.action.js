export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';

class Notifications {
    setNotifications = (notifications) => (dispatch) =>
        dispatch({
            type: SET_NOTIFICATIONS,
            notifications,
        });
}
export default new Notifications();
