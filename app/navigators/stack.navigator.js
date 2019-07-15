import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
    headerMode: 'none',
    },
    Registration : {
        screen : Registration,
    }
},{

    headerMode: 'none',
});

const createStackWithNotifIcon = (screens) =>
    createStackNavigator(screens,
        {
            navigationOptions : (({ navigation, screenProps }) => ({
                headerLeft : (
                    <TouchableOpacity onPress={navigation.toggleDrawer}>
                        <Entypo name="list" size={35} color="#fff" style={{ marginLeft : 5 }} />
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
                <Entypo name="home" size={20} color="#fff" />
            ),
        },
    },
    Wallet : {
        screen: createStackWithNotifIcon({Wallet}),
        navigationOptions: {
            drawerLabel: 'Wallet',
            drawerIcon: () => (
                <Entypo name="wallet" size={20} color="#fff" />
            )
        },
    },
    UserProfile : {
        screen: createStackWithNotifIcon({UserProfile}),
        navigationOptions: {
            drawerLabel: 'User',
            drawerIcon: () => (
                <FontAwesome name="user" size={20} color="#fff" />
            )
        },
    },
    Feedbacks : {
        screen: createStackWithNotifIcon({Feedbacks}),
        navigationOptions: {
            drawerLabel: 'Feedbacks',
            drawerIcon: () => (
                <MaterialIcons name="feedback" size={20} color="#fff" />
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
                <Entypo name="address" size={20} color="#fff" />
            )
        },
    },
    MakeBookings : {
        screen: createStackWithNotifIcon({MakeBookings}),
        // screen: createStackWithNotifIcon({Location,Confirm,Details}),
        navigationOptions: {
            drawerLabel: 'Make Bookings',
            drawerIcon: () => (
                <Entypo name="new-message" size={20} color="#fff" />
            )
        },
    },
    ViewTrips : {
        screen: createStackWithNotifIcon({ViewTrips, ManageAttendees}),
        navigationOptions: {
            drawerLabel: 'View Trips',
            drawerIcon: () => (
                <Entypo name="calendar" size={20} color="#fff" />
            )
        },
    },
}, {
    contentComponent : DrawerComponent,
    drawerBackgroundColor : '#0B5173',
});
class ModalScreen extends React.Component {
    render() {
      return (
        <View style={{ margin: 50, flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor: 'orange' }}>
          <Text style={{ fontSize: 30 }}>This is a modal!</Text>
          
        </View>
      );
    }
  }

const StackNavigator = createStackNavigator(
  {
    InitialRoute : { screen: InitialRoute },
    Authentication : { screen : AuthenticationStack },
    Home : { screen : DrawerStack },

  },
  {
    headerMode: 'none',
    navigationOptions: {
    },
  },
);

/*
  const RootStack = createStackNavigator(
    {
        InitialRoute : { screen: InitialRoute },
        Authentication : { screen : AuthenticationStack },
        Home : { screen : DrawerStack },
      MyModal: {
        screen: ModalScreen,
      },
    },
    {
      mode: 'modal',
      headerMode: 'none',
    }
  );
*/

export default StackNavigator;
