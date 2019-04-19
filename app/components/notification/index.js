import React from 'react';
import { connect } from 'react-redux';
import Entypo from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class NotificationIcon extends React.PureComponent<> {
    constructor(props){
        super(props);
        this.state = {
            hasNotification : false
        };
    }
    render() {
        const { hasNotification } = this.state;

        return (
            <TouchableOpacity onPress={() => this.setState({ hasNotification : !this.state.hasNotification})}>
                <Entypo name="ios-notifications" size={35} color={hasNotification ? "#FFA500" : "#fff"} style={{ marginRight : 10 }} />
            </TouchableOpacity>
        );
    }
}

NotificationIcon.defaultProps = {
    notifications : [],
}