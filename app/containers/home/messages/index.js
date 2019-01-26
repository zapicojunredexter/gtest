import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
} from 'react-native';

type Props = {
};


class Messages extends React.PureComponent<Props> {
    static navigationOptions = {
        title : 'MESSAGES',
        headerLeft : null,
    }
    render() {
        return (
            <View>
                <Text>Messages</Text>
            </View>
        );
    }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Messages);
