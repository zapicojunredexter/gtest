import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image
} from 'react-native';
import { getUser } from '../../../selectors/user.selector';

const _style = StyleSheet.create({
});

class HeaderLeft extends React.PureComponent<> {
    render() {
        const { } = this.props;
        return (
            <TouchableOpacity {...this.props}>
                <Image
                    style={{
                        width: 30,
                        height: 30,
                        marginLeft : 10,
                    }}
                    source={require('../../../assets/images/user.png')}
                />
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
