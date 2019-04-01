import React from 'react';
import { View, Text, Button } from 'react-native';

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
    }

    render() {
        const { goToNext } = this.props;
        return (
            <View>
                <Text>IN DETAILS</Text>
                <Button
                    title="NEXT"
                    onPress={goToNext}
                />
            </View>
        );
    }
}

export default Container;