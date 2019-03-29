import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
} from 'react-native';
import AuthService from '../../../services/auth.service';

type Props = {
};


class Login extends React.Component<Props> {
    login = async () => {
        const { login } = this.props;
        const username = 'testemail@gmail.com', password = 'testpassword';
        
        login(username, password)
            .then(res => {
                console.log("HAHAz",res);
                this.props.navigation.navigate('Home');
            })
            .catch(error => {
                alert(error.message);
            });
    }
    render() {
        return (
        <View
        >
            <Text>You are in LOGIN PAGE</Text>
            <Button title="Registration" onPress={() => this.props.navigation.navigate('Registration')}/>
            <Button title="Home" onPress={this.login}/>
        </View>
        );
    }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
    login : (username, password) => dispatch(AuthService.login(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
