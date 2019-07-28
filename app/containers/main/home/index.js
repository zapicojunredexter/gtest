// /*
import React from 'react';
import { connect } from 'react-redux';
import {View, StyleSheet, TouchableOpacity,Text} from 'react-native';
import MapView from '../../../components/map.view';
import Picker from '../../../components/picker';
import Pathing from '../../../components/map.view/pathing';
import SystemRestricted from '../../../utils/system.restrction';
import RoutesService from '../../../services/routes.service';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


class Home extends React.Component {
    componentDidMount () {
        // this.props.fetchRoutes();
    }

    renderButtonRow = (item) => {
        return (
            <TouchableOpacity
                onPress={item.onPress}
                style={{
                    backgroundColor: "#0B5173",
                    margin: 10,
                    marginBottom: 0,
                    borderRadius: 3,
                    flexDirection: 'row',
                    padding: 20,
                }}
            >
                {item.icon}
                <Text style={{fontWeight: 'bold', fontSize: 14,marginLeft: 10,color:'white'}}>{item.label}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        const screens = {
            'Commuter' : [
                {
                    label: 'View Points Balance',
                    onPress: () => this.props.navigation.navigate('Wallet'),
                    icon: <Entypo name="wallet" size={20} color="#fff" />
                },
                {
                    label: 'Update Contact Number',
                    onPress: () => this.props.navigation.navigate('UserProfile'),
                    icon: <FontAwesome name="user" size={20} color="#fff" />
                },
                {
                    label: 'View Bookings History',
                    onPress: () => this.props.navigation.navigate('History'),
                    icon: <Entypo name="address" size={20} color="#fff" />
                },
                {
                    label: 'Book A Trip',
                    onPress: () => this.props.navigation.navigate('MakeBookings'),
                    icon: <Entypo name="new-message" size={20} color="#fff" />
                },
            ],
            'Driver' : [
                {
                    label: 'Update Contact Number',
                    onPress: () => this.props.navigation.navigate('UserProfile'),
                    icon: <FontAwesome name="user" size={20} color="#fff" />
                },
                {
                    label: 'View Feedbacks',
                    onPress: () => this.props.navigation.navigate('Feedbacks'),
                    icon: <MaterialIcons name="feedback" size={20} color="#fff" />
                },
                {
                    label: 'View My Trips History',
                    onPress: () => this.props.navigation.navigate('ViewTrips'),
                    icon: <Entypo name="address" size={20} color="#fff" />
                },
            ]
        };
        const userType = (this.props.user && this.props.user.AccountType);
        const filteredItems = screens[userType] || [];
        
        // const { routes } = this.props;
        // const routeNames = routes.map(route => route.Route);
        // return (
        //     <View style={{flex:1,backgroundColor:'#dae1e8'}}>
        //         {false && <MapView />}
        //         <MapView />
        //         <View style={{
        //             top: 0,
        //             left: 0,
        //             right: 0,
        //             bottom: 0,
        //             alignItems: 'center',
        //             position: 'absolute'
        //         }}>
        //             <View style={{opacity: 0.9, margin: 30,padding: 10, width: 150, borderRadius: 4, backgroundColor: 'white'}}>
        //                 <Text style={{ padding: 10, fontWeight: 'bold' }}>
        //                     From
        //                 </Text>
        //                 <Picker
        //                 // style={styles.componentPicker}
        //                     numberOfLines={1}
        //                     choices={routeNames}
        //                     // selectedValue={this.state.isRoutesFetching ? 'Fetching...' : (selectedRoute && selectedRoute.Route || "-")}
        //                     onSelect={(it) => alert(JSON.stringify(it))}
        //                     onSelect={(data) => {
        //                         const selectedRoute = routes.find(route => route.Route === data);
        //                         console.log('adsasda', selectedRoute);
        //                     }}
        //                 />
        //                 <Text style={{ padding: 10, fontWeight: 'bold', borderTopWidth: 1,borderTopColor:'silver' }}>
        //                     To
        //                 </Text>
        //             </View>
        //         </View>
        //     </View>
        // );
        return (
            <View style={{flex:1,backgroundColor:'#dae1e8', justifyContent: 'center'}}>
                <Text style={{textAlign:'center', fontSize: 15, fontWeight: 'bold'}}>What do you want to do now?</Text>
                {filteredItems.map(item => this.renderButtonRow(item))}
            </View>
        );
    }
}

const mapStateToProps = store => ({
    routes: store.routes,
    user : store.user
});
const mapDispatchToProps = dispatch => ({
    fetchRoutes: () => dispatch(RoutesService.fetchRoutes()),
});
export default SystemRestricted(connect(
    mapStateToProps,
    mapDispatchToProps,
    )(Home),
    {
        navigationOptions : {
            headerTitle : 'HOME'
        },
    });
// export default SystemRestricted(
//     Home,
//     {
//         navigationOptions : {
//             headerTitle : 'HOME'
//         },
//     });
// export default Home;