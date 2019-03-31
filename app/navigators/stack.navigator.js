import React from 'react';
import { View, Text, Image } from 'react-native';
import { createStackNavigator, createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import InitialRoute from './InitialRoute';
import Login from '../containers/authentication/login';
import Registration from '../containers/authentication/registration';
import Main from '../containers/main/home';
import Feedbacks from '../containers/main/feedbacks';
import History from '../containers/main/history';
import MakeBookings from '../containers/main/make.bookings';
import ViewTrips from '../containers/main/view.trips';
import UserProfile from '../containers/main/profile';
import DrawerComponent from './drawer.component';

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
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: () => (
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
            )
        },
    },
    UserProfile : {
        screen: createStackNavigator({UserProfile}),
        navigationOptions: {
            drawerLabel: 'User',
            drawerIcon: () => (
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
            )
        },
    },
    Feedbacks : {
        screen: createStackNavigator({Feedbacks}),
        navigationOptions: {
            drawerLabel: 'Feedbacks',
            drawerIcon: () => (
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
            )
        },
    },
    History : {
        screen: createStackNavigator({History}),
        navigationOptions: {
            drawerLabel: 'History',
            drawerIcon: () => (
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
            )
        },
    },
    MakeBookings : {
        screen: createStackNavigator({MakeBookings}),
        navigationOptions: {
            drawerLabel: 'Make Bookings',
            drawerIcon: () => (
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
            )
        },
    },
    ViewTrips : {
        screen: createStackNavigator({ViewTrips}),
        navigationOptions: {
            drawerLabel: 'View Trips',
            drawerIcon: () => (
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
            )
        },
    },
}, {
    contentComponent : DrawerComponent,
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
