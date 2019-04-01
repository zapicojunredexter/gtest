import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import AuthService from '../../../services/auth.service';

class Container extends React.PureComponent<> {
    static navigationOptions = {
        headerTitle : 'PROFILE',
    };

    constructor(props) {
        super(props);
    }

    render() {
        const { user } = this.props;
        return (
            <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                <Text>{JSON.stringify(user)}</Text>
                <Button
                    onPress={async () => {
                        await this.props.logout();
                        this.props.navigation.navigate('Login');
                    }}
                    title="LOGOUT"
                />
            </View>
        );
    }
}


const mapStateToProps = store => ({
    user : store.user
});
const mapDispatchToProps = dispatch => ({
    login : (username, password) => dispatch(AuthService.login(username, password)),
    logout : () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);