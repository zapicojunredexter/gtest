import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

import Foundation from 'react-native-vector-icons/Foundation';
import { createStackNavigator, createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import AuthService from '../services/auth.service';

const screens = {
    'Commuter' : {
        'Main' : true,
        'Wallet' : true,
        'UserProfile' : true,
        'History' : true,
        'MakeBookings' : true,
    },
    'Driver' : {
        'Main' : true,
        'UserProfile' : true,
        'Feedbacks' : true,
        // 'History' : true,
        'ViewTrips' : true,
    }
};

class DrawerComponent extends React.PureComponent<> {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, items } = this.props;
        if(!(user.AccountType)){
            return null;
        }
        const filteredItems = items.filter((item, index) => screens[user.AccountType][item.key]);
        return (
            <ScrollView>
                <View style={{width:'100%',backgroundColor : '#147DAD',padding:20, alignItems:'center'}}>
                    {/*
                    <Image
                        style={{width: 70, height: 70}}
                        source={false ? require('../assets/images/male.png') : require('../assets/images/female.png')}
                    />
                    
                    */}
                    <View
                        style={{
                            backgroundColor: '#0B5173',
                            height: 80,
                            width: 80,
                            borderRadius:40,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Foundation
                            name={user.Gender === 'female' ? 'torso-female' : 'torso'}
                            size={70}
                            color="#fff"
                        />
                    </View>
                    <Text style={{color: 'white',fontWeight: 'bold', fontSize: 15}}>{`${user.FirstName} ${user.LastName}`}</Text>
                </View>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems
                        {...this.props}
                        items={filteredItems}
                        activeTintColor="white"
                        inactiveTintColor="white"
                    />
                    <View style={{marginLeft: 5, marginRight: 5, marginTop: 20, marginBottom: 20, borderColor: 'gray', borderTopWidth: 0.5}}/>
                    <TouchableOpacity
                        style={{padding: 10,paddingLeft: 15}}
                        onPress={() => alert('TODO: terms and conditions')}
                    >
                        <Text style={{color: 'white'}}>Terms & Conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{padding: 5,paddingLeft: 15}}
                        onPress={
                            async () => {
                                await this.props.logout();
                                this.props.navigation.navigate('Login');
                            }
                        }
                    >
                        <Text style={{color: 'white'}}>Logout</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ScrollView>
        );
    }
}


const mapStateToProps = store => ({
    user : store.user
});
const mapDispatchToProps = dispatch => ({
    logout : () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrawerComponent);