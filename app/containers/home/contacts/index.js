import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
} from 'react-native';

type Props = {
};


class Contacts extends React.PureComponent<Props> {
    static navigationOptions = {
        title : 'CONTACTS',
    }
    render() {
        return (
            <View>
                <Text>Contacts</Text>
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
)(Contacts);
