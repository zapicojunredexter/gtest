import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';

export default class NotificationIcon extends React.PureComponent<> {
    render() {
        const hasNotification = this.props.notifications.length > 0;
        return (
            <View style={{backgroundColor:'red'}}>

                <Text>{hasNotification ? `has notifs`:`no notifs`}</Text>
                {/*
                <Image
                    style={{marginLeft : 15, width: 35, height: 35}}
                    source={require('../../assets/images/burger.png')}
                />
                */}
            </View>
        );
    }
}

NotificationIcon.defaultProps = {
    notifications : [],
}