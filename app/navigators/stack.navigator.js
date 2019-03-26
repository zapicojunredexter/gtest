import React from 'react';
import View from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import InitialRoute from './InitialRoute';
import Login from '../containers/authentication/login';
import Registration from '../containers/authentication/registration';
import Main from '../containers/main/home';
import Feedbacks from '../containers/main/feedbacks';
import History from '../containers/main/history';
import MakeBookings from '../containers/main/make.bookings';
import ViewTrips from '../containers/main/view.trips';

const AuthenticationStack = createStackNavigator({
    Login : {
        screen : Login,
    },
    Registration : {
        screen : Registration,
    }
});

const DrawerStack = createDrawerNavigator({
    Main: {
        screen: Main,
    },
    Feedbacks : {
        screen: Feedbacks,
    },
    History : {
        screen: History,
    },
    MakeBookings : {
        screen: MakeBookings,
    },
    ViewTrips : {
        screen: ViewTrips,
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
