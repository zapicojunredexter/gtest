import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import InitialRoute from './InitialRoute';
import Login from '../containers/authentication/login';
import Registration from '../containers/authentication/registration';
import Main from '../containers/main/home';
import Feedbacks from '../containers/main/feedbacks';
import History from '../containers/main/history';
import MakeBookings from '../containers/main/make.bookings';
import ViewTrips from '../containers/main/view.trips';
import UserProfile from '../containers/main/profile';

const AuthenticationStack = createStackNavigator({
    Login : {
        screen : Login,
    },
    Registration : {
        screen : Registration,
    }
});

const createStackWithNotifIcon = (screens) =>
    createStackNavigator(screens,
        {
            navigationOptions : (({ navigation, screenProps }) => ({
                headerLeft : <Text onPress={navigation.toggleDrawer}>toggle drawer</Text>,
                headerRight : <Text>asdas</Text>,
            })),
        }
    );

const DrawerStack = createDrawerNavigator({
    Main: {
        screen: createStackWithNotifIcon({Main}),
    },
    UserProfile : {
        screen: createStackNavigator({UserProfile}),
    },
    Feedbacks : {
        screen: createStackNavigator({Feedbacks}),
    },
    History : {
        screen: createStackNavigator({History}),
    },
    MakeBookings : {
        screen: createStackNavigator({MakeBookings}),
    },
    ViewTrips : {
        screen: createStackNavigator({ViewTrips}),
    },
});

const StackNavigator = createStackNavigator(
  {
    InitialRoute : { screen: InitialRoute },
    Authentication : { screen : AuthenticationStack },
    Home : { screen : DrawerStack }
  },
  {
    headerMode: 'none',
    navigationOptions: {
    },
  },
);

export default StackNavigator;
