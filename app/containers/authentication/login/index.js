import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Button,
    TextInput
} from 'react-native';
import AuthService from '../../../services/auth.service';
import CombineService from '../../../services/combine.service';

type Props = {
};


class Login extends React.Component<Props> {
    state = {
        username : 'junre@yah.com',
        password : 'junrejunre',
        isLoading : false,
    }
    login = async () => {
        const { login } = this.props;
        const { username, password } = this.state;
        this.setState({isLoading:true});
        
        login(username, password)
            .then(res => {
                this.setState({isLoading:false});
                this.props.masterSnap();
                this.props.navigation.navigate('Home');
            })
            .catch(error => {
                this.setState({isLoading:false});
                alert(error.message);
            });
    }
    render() {
        const { isLoading } = this.state;
        return (
            <View>
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
                <Button
                    title={isLoading ? "LOGGING IN ..." : "LOGIN"}
                    onPress={this.login}
                    disabled={isLoading}
                />
            </View>
        );
    }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
    login : (username, password) => dispatch(AuthService.login(username, password)),
    masterSnap : () => dispatch(CombineService.masterSnap()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
