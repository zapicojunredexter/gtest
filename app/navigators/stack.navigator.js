import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { createStackNavigator, createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import InitialRoute from './InitialRoute';
import Login from '../containers/authentication/login';
import Registration from '../containers/authentication/registration';
import Main from '../containers/main/home';
import Feedbacks from '../containers/main/feedbacks';
import History from '../containers/main/history';
import HistoryDetails from '../containers/main/history/history.details';
import DriverTripDetails from '../containers/main/history/driver.trip';
import MakeBookings from '../containers/main/make.bookings';
import ViewTrips from '../containers/main/view.trips';
import ManageAttendees from '../containers/main/view.trips/manage.attendees';
import UserProfile from '../containers/main/profile';
import Wallet from '../containers/main/wallets';
import DrawerComponent from './drawer.component';
import NotificationIcon from '../components/notification';

import Location from '../containers/main/make.bookings/steps/location';
import Details from '../containers/main/make.bookings/steps/details';
import Confirm from '../containers/main/make.bookings/steps/confirm';

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
                headerLeft : (
                    <TouchableOpacity onPress={navigation.toggleDrawer}>
                        <Image
                            style={{marginLeft : 15, width: 35, height: 35}}
                            source={require('../assets/images/burger.png')}
                        />
                    </TouchableOpacity>
                    
                ),
                headerRight : <NotificationIcon />,
                headerStyle: {
                    backgroundColor: '#0B5173',
                },
                headerTintColor: '#fff',
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
                    style={{width: 25, height: 25}}
                    source={require('../assets/images/home.png')}
                />
            ),
        },
    },
    Wallet : {
        screen: createStackWithNotifIcon({Wallet}),
        navigationOptions: {
            drawerLabel: 'Wallet',
            drawerIcon: () => (
                <Image
                    style={{width: 25, height: 25}}
                    source={require('../assets/images/wallet.png')}
                />
            )
        },
    },
    UserProfile : {
        screen: createStackWithNotifIcon({UserProfile}),
        navigationOptions: {
            drawerLabel: 'User',
            drawerIcon: () => (
                <Image
                    style={{width: 25, height: 25}}
                    source={require('../assets/images/profile.png')}
                />
            )
        },
    },
    Feedbacks : {
        screen: createStackWithNotifIcon({Feedbacks}),
        navigationOptions: {
            drawerLabel: 'Feedbacks',
            drawerIcon: () => (
                <Image
                    style={{width: 25, height: 25}}
                    source={require('../assets/images/feedbacks.png')}
                />
            )
        },
    },
    History : {
        screen: createStackWithNotifIcon({
            History,
            HistoryDetails,
            DriverTripDetails,
        }),
        navigationOptions: {
            drawerLabel: 'History',
            drawerIcon: () => (
                <Image
                    style={{width: 25, height: 25}}
                    source={require('../assets/images/history.png')}
                />
            )
        },
    },
    MakeBookings : {
        screen: createStackWithNotifIcon({MakeBookings}),
        // screen: createStackWithNotifIcon({Location,Confirm,Details}),
        navigationOptions: {
            drawerLabel: 'Make Bookings',
            drawerIcon: () => (
                <Image
                    style={{width: 25, height: 25}}
                    source={require('../assets/images/bookings.png')}
                />
            )
        },
    },
    ViewTrips : {
        screen: createStackWithNotifIcon({ViewTrips, ManageAttendees}),
        navigationOptions: {
            drawerLabel: 'View Trips',
            drawerIcon: () => (
                <Image
                    style={{width: 25, height: 25}}
                    source={require('../assets/images/trips.png')}
                />
            )
        },
    },
}, {
    contentComponent : DrawerComponent,
    drawerBackgroundColor : '#0B5173',
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
