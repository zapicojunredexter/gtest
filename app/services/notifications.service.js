import firebase from 'react-native-firebase';

class NotificationsService {

    notificationListener = null;

    unlistenNotifications = () => async (dispatch, getState) => {
        if(this.notificationListener) {
            this.notificationListener();
        }
    }

    listenNotifications = () => async (dispatch, getState) => {
        const state = getState();
        const { user } = state;
        this.unlistenNotifications();
        
        if(!user.Id){
            return;
        }
        try {
            // const notifications = await response.json().catch(error => { throw error });
            // if(notifications.Message) { return Promise.reject(new Error(data.Message)) }
            // const mappedNotifs = notifications.map(notif => ({
            //     ...notif,
            //     title : '',
            //     description : notif.notif_mess,
            // }));
            
            // dispatch(NotificationsActions.setNotifications(mappedNotifs));

            this.notificationListener = firebase.firestore()
                .collection('Users')
                .doc(user.Id)
                .collection('Notifications')
                .where("Status","==","Unread")
                .onSnapshot(notification => {
                    const notifs = notification.docs.map(data => data.data());

                    console.log('BAGO NOTIF',notifs);
                    // const userData = user.data();
                    // dispatch(UserAction.setUser(userData));
                })
        } catch(err) {
        }

    };
}

export default new NotificationsService();
