import React from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import Listener from '../listeners/listeners.navigation';
// import SystemActions from '../reducers/system/system.action';
// import UserService from '../services/user.service';
// import bookingsService from '../services/bookings.service';
import CombineService from '../services/combine.service';
import {NotificationsAndroid} from 'react-native-notifications';
import ReviewDriverModal from './ReviewDriverModal';
type Props = {
};


class InitialRoute extends React.Component<Props> {
    constructor(props){
        super(props);
        this.state = {
            driver: null,
        };
        const { navigation } = props;
        const isLoggedIn = !!firebase.auth().currentUser;

        this.testFunciton();
        if(!isLoggedIn) {

            navigation.navigate('Login');
        } else {

            navigation.navigate('Home');
            props.masterSnap();
        }
        
    }

    testFunciton = async () => {
        const hasPermission = await firebase.messaging().hasPermission();
        if(!hasPermission) {
            await firebase.messaging().requestPermission();
        }
        firebase.notifications().onNotification((notification) => {
            if(this.props.user.Id) {
                const notif = new firebase.notifications.Notification()
                .setNotificationId(notification._notificationId)
                .setTitle(notification._title)
                .setBody(notification._body)
                .setData(notification._data)
                .android.setSmallIcon('ic_notification')
                .android.setLargeIcon('ic_notification')
                .android.setChannelId('testchannel');
                if(notification.data.status_code === 'REVIEW_DRIVER' && notification.data.driver) {
                    const driver = JSON.parse(notification.data.driver);
                    this.setState({driver: driver });
                }
                firebase.notifications().displayNotification(notif);
            }
          });
    }
    
    render() {
        return (
            <View>
                <ReviewDriverModal
                    modalProps={{
                        isVisible: !!this.state.driver,
                        onBackdropPress : () => this.setState({driver : false})
                    }}
                    driver={this.state.driver}
                />
                <Listener {...this.props} />
            </View>
        );
    }
}
const mapStateToProps = store => ({
    user: store.user,
});
const mapDispatchToProps = dispatch => ({
    masterSnap : () => dispatch(CombineService.masterSnap()),
    // setHasInternetConnection : () => dispatch(SystemActions.setHasInternet(true)),
    // listenUserUpdates : () => dispatch(UserService.listenUser()),
    // listenUserBookings : () => dispatch(bookingsService.listenUserBookings())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitialRoute);
