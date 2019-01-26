import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
} from 'react-native';

type Props = {
};


class WhitePane extends React.PureComponent<Props> {
    static navigationOptions = {
        title : 'WHITE PANE',
    }
    render() {
        return (
            <View>
                <Text>white pane</Text>
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
)(WhitePane);
