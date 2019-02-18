import NotificationsActions from '../reducers/notifications/notifications.action';

class NotificationsService {
    fetchNotifications = () => async (dispatch, getState) => {
        const state = getState();
        const { api } = state.system;
        const { user } = state;
        // TODO fetch from back end
        // const notifications = [
        //     {
        //         title : "sample notification 1",
        //         description : "sample notification body 1"
        //     },
        //     {
        //         title : "sample notification 2",
        //         description : "sample notification body 2"
        //     },
        //     {
        //         title : "sample notification 3",
        //         description : "sample notification body 3"
        //     },
        // ];
        const url = `${api}/apis/fetch_notifications.php?userId=${user.userId}`;

        const response = await fetch(url).catch(error => { throw error });
        const notifications = await response.json().catch(error => { throw error });
        const mappedNotifs = notifications.map(notif => ({
            ...notif,
            title : '',
            description : notif.notif_mess,
        }));

        dispatch(NotificationsActions.setNotifications(mappedNotifs));
    };
}

export default new NotificationsService();
