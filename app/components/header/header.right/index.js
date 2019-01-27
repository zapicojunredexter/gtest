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

class HeaderRight extends React.PureComponent<> {
    render() {
        console.log('U HAVE PROPS HERE', this.props);
        const { } = this.props;
        return (
            <TouchableOpacity {...this.props}>
                <Text>HEADR GIHT</Text>
            </TouchableOpacity>
        );
    }
}

HeaderRight.defaultProps = {
};

const mapStateToProps = store => ({
    user : getUser(store),
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderRight);
