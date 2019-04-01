import React from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ScrollView } from 'react-native';
import { createStackNavigator, createDrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import AuthService from '../services/auth.service';

class DrawerComponent extends React.PureComponent<> {
    constructor(props) {
        super(props);
    }

    render() {
        const { user, items } = this.props;
        // const filteredItems = items.filter((item, index) => index <= 2);
        const filteredItems = items.filter((item, index) => true);
        return (
            <ScrollView>
                <View style={{width:'100%',backgroundColor : '#147DAD',padding:20, alignItems:'center'}}>
                    <Image
                        style={{width: 70, height: 70}}
                        source={false ? require('../assets/images/male.png') : require('../assets/images/female.png')}
                    />
                    <Text>{JSON.stringify(user)}</Text>
                </View>
                <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems
                        {...this.props}
                        items={filteredItems}
                        activeTintColor="white"
                        inactiveTintColor="white"
                    />
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