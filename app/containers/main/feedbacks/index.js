import React from 'react';
import { View, Text } from 'react-native';

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>IN CONTAINER</Text>
            </View>
        );
    }
}

export default Container;