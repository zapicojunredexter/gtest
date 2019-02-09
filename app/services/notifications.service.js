import NotificationsActions from '../reducers/notifications/notifications.action';

class NotificationsService {
    fetchNotifications = () => async (dispatch) => {

        // TODO fetch from back end
        const notifications = [
            {
                title : "sample notification 1",
                description : "sample notification body 1"
            },
            {
                title : "sample notification 2",
                description : "sample notification body 2"
            },
            {
                title : "sample notification 3",
                description : "sample notification body 3"
            },
        ];
        dispatch(NotificationsActions.setNotifications(notifications));
    };
}

export default new NotificationsService();
