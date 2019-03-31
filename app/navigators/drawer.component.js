import React from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView } from 'react-native';
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
                <Text>{JSON.stringify(user)}</Text>
                <SafeAreaView style={{backgroundColor : 'red'}} forceInset={{ top: 'always', horizontal: 'never' }}>
                    <DrawerItems
                        {...this.props}
                        items={filteredItems}
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