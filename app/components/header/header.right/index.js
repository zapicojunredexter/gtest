import React from 'react';
import { connect } from 'react-redux';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { getUser } from '../../../selectors/user.selector';

const _style = StyleSheet.create({
});

class HeaderRight extends React.PureComponent<> {
    render() {
        console.log('U HAVE PROPS HEREz', this.props);
        const { navigation } = this.props;
        return (
            <View style={{flexDirection : "row"}}>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                            marginRight : 10,
                        }}
                        source={require('../../../assets/images/notification.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                            marginRight : 10,
                        }}
                        source={require('../../../assets/images/burgerlines.png')}
                    />
                    
                </TouchableOpacity>
            </View>
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
