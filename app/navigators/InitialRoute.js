import React from 'react';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import {
  Text,
  View,
} from 'react-native';
import Listener from '../listeners/listeners.navigation';
// import SystemActions from '../reducers/system/system.action';
// import UserService from '../services/user.service';
// import bookingsService from '../services/bookings.service';
import CombineService from '../services/combine.service';

type Props = {
};


class InitialRoute extends React.Component<Props> {
    constructor(props){
        super(props);
        const { navigation } = props;
        const isLoggedIn = !!firebase.auth().currentUser;

        if(!isLoggedIn) {

            navigation.navigate('Login');
        } else {

            navigation.navigate('Home');
            props.masterSnap();
        }
        
    }
    
    render() {
        return (
            <View>
                <Listener {...this.props} />
            </View>
        );
    }
}
const mapStateToProps = store => ({
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
