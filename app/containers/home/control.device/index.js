import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
} from 'react-native';

type Props = {
};


class ControlDevice extends React.PureComponent<Props> {
    static navigationOptions = {
        title : 'SECULACE',
    }
    render() {
        return (
            <View>
                <Text>Control Device</Text>
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
)(ControlDevice);
