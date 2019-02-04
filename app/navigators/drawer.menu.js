import React from 'react';
import { Text, TouchableOpacity, View, ScrollView, StyleSheet,Image } from 'react-native';
import { Text as TextSMS } from 'react-native-openanything';
import { connect } from 'react-redux';
import { getUser } from '../selectors/user.selector';
import { getCurrentPath } from '../selectors/system.selector';
import { colors } from '../constants/colors';
import UserActions from '../reducers/user/user.action';
import SystemActions from '../reducers/system/system.action';

type Props = {
  navigation: {
    navigate: Function,
    dispatch: Function,
  },
};

const _styles = (userType = 'seculacer') => StyleSheet.create({
    mainContainer : {
        backgroundColor : colors[userType].main,
        flex : 1,
    },
    linksScrollBar : {
        flex  : 1,
    },
    subOptions : {
    },
    subOptionTxt : {
        color : colors.fontColor,
    },
    navLink : {
        padding : 10,
        paddingLeft : 50,
        fontSize : 15,
        color : colors.fontColor,
    },
    activeLink : {
        backgroundColor : colors.fontColor,
        color : colors[userType].mainHeader
    }
});
const drawerLinks = {
    seculacer : [
        {label : 'CONTROL NECKLACE', path : 'ControlDevice'},
        {label : 'WHITE PANE', path : 'WhitePane'},
        {label : 'NOTIFICATION', path : 'Notifications'},
        {
            label : 'MESSAGES',
            path : 'Messages',
            onPress : () => TextSMS('09771634283'),
            onPress : () => TextSMS('09569006808', 'zxc'),
        },
        {label : 'CONTACTS', path : 'Contacts'},
        {label : 'VIP', path : 'VIP'},
    ],
    responder : [],
};


class DrawerMenu extends React.Component<Props> {
    constructor(props){
        super(props);
        const { navigation } = props;
        navigation.setParams({ user : { ...props.user }});
        
    }
    onPressLogout = () => {
        const { navigation, logout } = this.props;
        logout();
        navigation.navigate('Login');
    }
    render() {
        const { navigation, user, setCurrentPath, currentPath } = this.props;
        if(!user) return null;
        const userType = user.type;
        const styles = _styles(userType || 'seculacer');
        const userLinks = drawerLinks[userType];

        return (
            <View style={styles.mainContainer}>
                <View style={{
                    backgroundColor : colors[userType].mainHeader,
                    width:'100%',
                    height : 100,
                    alignItems : 'center',
                    flexDirection:"row",
                    paddingLeft : 15,
                }}>
                    <Image
                        style={{
                            width : 50,
                            height : 50,
                        }}
                        source={require('../assets/images/user.png')}
                    />
                    <View>
                        <Text style={{color : colors.fontColor, fontSize : 17,paddingLeft : 5}}>{userType}</Text>
                        <Text style={{color : colors.fontColor, fontSize : 12,paddingLeft : 5}}>someone</Text>
                    </View>
                </View>
                <ScrollView>
                    {userLinks.map(userLink => (
                        <TouchableOpacity
                            onPress={userLink.onPress || (() => {
                                setCurrentPath(userLink.path);
                                navigation.navigate(userLink.path);
                            })}
                        >
                            <Text style={[
                                styles.navLink,
                                currentPath === userLink.path && styles.activeLink
                                ]}>{userLink.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.subOptions}>
                    <Text onPress={this.onPressLogout} style={styles.subOptionTxt}>Logout</Text>
                    <Text style={styles.subOptionTxt}>Help</Text>
                    <Text style={styles.subOptionTxt}>Settings</Text>
                    <Text style={styles.subOptionTxt}>About</Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = store => ({
    currentPath : getCurrentPath(store),
    user : getUser(store),
});
const mapDispatchProps = dispatch => ({
    logout : () => dispatch(UserActions.setNewUser(null)),
    setCurrentPath : (path) => dispatch(SystemActions.setCurrentPath(path)),
});

export default connect(
    mapStateToProps,
  mapDispatchProps,
)(DrawerMenu);