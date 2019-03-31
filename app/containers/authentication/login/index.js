import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Button,
    TextInput
} from 'react-native';
import AuthService from '../../../services/auth.service';

type Props = {
};


class Login extends React.Component<Props> {
    state = {
        username : 'junre@yah.com',
        password : 'junrejunre'
    }
    login = async () => {
        const { login } = this.props;
        const { username, password } = this.state;
        
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

            <TextInput
                onChangeText={(text) => this.setState({ username : text })}
                value={this.state.username}
                style={{width : '100%'}}
            />
            <TextInput
                onChangeText={(text) => this.setState({ password : text })}
                value={this.state.password}
                style={{width : '100%'}}
            />
            <Button title="Registration" onPress={() => this.props.navigation.navigate('Registration')}/>
            <Button title="LOGIN" onPress={this.login}/>
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
