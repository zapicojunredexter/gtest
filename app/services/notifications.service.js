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
        console.log('STARING');
        const response = await fetch(`${api}/fetchNotification.php`,{
            method : 'get',
        }).catch(error => { throw error});
        
        try {
            const notifications = await response.json().catch(error => { throw error });
            if(notifications.Message) { return Promise.reject(new Error(data.Message)) }
            const mappedNotifs = notifications.map(notif => ({
                ...notif,
                title : '',
                description : notif.notif_mess,
            }));
            
            dispatch(NotificationsActions.setNotifications(mappedNotifs));
        } catch(err) {
            throw new Error('Invalid response format');
        }

    };
}

export default new NotificationsService();
