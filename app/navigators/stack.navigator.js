import React from 'react';
import Text from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import InitialRoute from './InitialRoute';
import { ControlDevice, Contacts, Messages, Notifications, VIP, WhitePane, EDM } from '../containers/home';
import Login from '../containers/authentication/login';
import Registration from '../containers/authentication/registration';
import DrawerMenu from './drawer.menu';
const AuthenticationStack = createStackNavigator({
    Login : {
        screen : Login,
    },
    Registration : {
        screen : Registration,
    },
});

const MainStack = createStackNavigator({
    ControlDevice: { screen: ControlDevice },
    Contacts: { screen: Contacts },
    Messages: { screen: Messages },
    Notifications: { screen: Notifications },
    VIP: { screen: VIP },
    WhitePane: { screen: WhitePane },
    EDM : { screen: EDM },
});


const HomeStack = createDrawerNavigator({
    Home: {
        screen: MainStack,
    },
},
{
    contentComponent: props => <DrawerMenu {...props} />,
});

const StackNavigator = createStackNavigator(
  {
    InitialRoute : { screen: InitialRoute },
    Authentication : { screen : AuthenticationStack },
    Home : { screen : HomeStack }
  },
  {
    headerMode: 'none',
    navigationOptions: {
    },
  },
);

export default StackNavigator;
