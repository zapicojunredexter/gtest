import React from 'react';
import { View, Text } from 'react-native';
import Steps from './make.bookings.step';

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <Text>IN CONTAINER</Text>
                <Steps />
            </View>
        );
    }
}

export default Container;