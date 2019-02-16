import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  View
} from 'react-native';
import { getUser } from '../../../selectors/user.selector';

const _style = StyleSheet.create({
});

class HeaderLeft extends React.PureComponent<> {
    render() {
        const { navigation, user } = this.props;
        if(!user)return null;
        const userType = user.type;
        return (
            <View style={{flexDirection : "row"}}>
                {userType === 'responder' && (
                    <TouchableOpacity onPress={() => navigation.navigate('RespondersWatchlist')} {...this.props}>
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                                marginLeft : 10,
                            }}
                            source={require('../../../assets/images/eye.png')}
                        />
                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => navigation.navigate(userType === 'seculacer' ? 'WhitePane' : 'EDM')}>
                    {userType === 'responder' ? (
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                                marginLeft : 10,
                            }}
                            source={require('../../../assets/images/user.png')}
                        />
                    ) : (
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                                marginLeft : 10,
                            }}
                            source={require('../../../assets/images/notification.png')}
                        />
                    )}
                </TouchableOpacity>

                {userType === 'responder' && (
                    <TouchableOpacity onPress={() => navigation.navigate('IncidentReport')}>
                        <Image
                            style={{
                                width: 30,
                                height: 30,
                                marginLeft : 10,
                            }}
                            source={require('../../../assets/images/document.png')}
                        />
                    </TouchableOpacity>
                )}
            </View>
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
