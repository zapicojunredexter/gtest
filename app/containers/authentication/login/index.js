import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
} from 'react-native';
import UserAction from '../../../reducers/user/user.action';
import UserService from '../../../services/user.service';
import { getUser } from '../../../selectors/user.selector';


type Props = {
    user : Object,
    login : Function,
    setNewUser : Function,
};


class Login extends React.Component<Props> {
    static navigationOptions = ({ navigation }) => ({
        title: 'LOGIN',
        headerBackTitle: null,
    })

    render() {
        const {
            setNewUser,
            login,
        } = this.props;

        return (
            <View>
                <Text>Login</Text>
                <Button title="Registration" onPress={() => this.props.navigation.navigate('Registration')}/>
                <Button title="Home" onPress={() => this.props.navigation.navigate('Home')}/>
                <Button title="SET NEW USER" onPress={() => setNewUser({username:"set user"})}/>
                <Button title="LOGIN" onPress={() => login({username:"logged in"})}/>
            </View>
        );
    }
}
const mapStateToProps = store => ({
    user : getUser(store),
});
const mapDispatchToProps = dispatch => ({
    login : credentials => dispatch(UserService.login(credentials)),
    setNewUser : (newUser) => dispatch(UserAction.setNewUser(newUser)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
