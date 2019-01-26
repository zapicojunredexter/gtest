import React from 'react';
import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getUser } from '../selectors/user.selector';
import { colors } from '../constants/colors';

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
});
const drawerLinks = {
    seculacer : [
        {label : 'CONTROL NECKLACE', path : 'ControlDevice'},
        {label : 'WHITE PANE', path : 'WhitePane'},
        {label : 'NOTIFICATION', path : 'Notifications'},
        {label : 'MESSAGES', path : 'Messages'},
        {label : 'CONTACTS', path : 'Contacts'},
        {label : 'VIP', path : 'VIP'},
    ],
    responder : [],
};


class DrawerMenu extends React.Component<Props> {
    render() {
        const { navigation, user } = this.props;
        const currentPath = navigation.getParam('currentPath', null);
        const userType = user.type;
        const styles = _styles(userType || 'seculacer');
        const userLinks = drawerLinks[userType];

        return (
            <View style={styles.mainContainer}>
                <View style={{backgroundColor : 'orange',width:'100%',height : 100}} />
                <ScrollView>
                    {userLinks.map(userLink => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate(userLink.path)}
                        >
                            <Text style={styles.navLink}>{userLink.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <View style={styles.subOptions}>
                    <Text style={styles.subOptionTxt}>Help</Text>
                    <Text style={styles.subOptionTxt}>Settings</Text>
                    <Text style={styles.subOptionTxt}>About</Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = store => ({
    user : getUser(store),
});
const mapDispatchProps = dispatch => ({
});

export default connect(
    mapStateToProps,
  mapDispatchProps,
)(DrawerMenu);