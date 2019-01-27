import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { getUser } from '../../../selectors/user.selector';

const _style = StyleSheet.create({
});

class HeaderLeft extends React.PureComponent<> {
    render() {
        const { } = this.props;
        return (
            <TouchableOpacity {...this.props}>
                <Text>LEFT</Text>
            </TouchableOpacity>
        );
    }
}

HeaderLeft.defaultProps = {
};

const mapStateToProps = store => ({
    user : getUser(store),
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderLeft);
