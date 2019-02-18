import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Image,
  Alert
} from 'react-native';
import UserAction from '../../../reducers/user/user.action';
import SystemActions from '../../../reducers/system/system.action';
import UserService from '../../../services/user.service';
import { getUser } from '../../../selectors/user.selector';

import styles from './styles';

import TextInput from '../../../components/text.input';
import Button from '../../../components/button';
import { TextField } from 'react-native-material-textfield';

type Props = {
    user : Object,
    login : Function,
    setNewUser : Function,
};

class Login extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => ({
        header : null,
    });

    constructor(props) {
        super(props);
        this.state = {
            username : {
                value : '1',
                errorMessage : '',
            },
            password : {
                value : '',
                errorMessage : '',
            },
        };
    }

    setCredentials = (key, value) => {
        const currentKeyState = this.state[key];
        this.setState({[key] : { ...currentKeyState, value }});
    }

    onPressSignIn = () => {
        const { login, navigation, setCurrentPath } = this.props;

        const newUser = {
            username : this.state.username.value,
            type : this.state.username.value == 1 ? 'responder' : 'seculacer'
        }
        login(newUser);
        const goTo = newUser.type === 'seculacer' ? 'ControlDevice' : 'EDM';
        navigation.navigate(goTo);
        setCurrentPath(goTo);
    }

    render() {
        const {
            username,
            password
        } = this.state;
        const _styles = styles('seculacer');

        return (
            <View style={_styles.mainContainer}>
                <View style={_styles.logoWrapper}>
                    <Image
                        style={{
                            // flex: 1,
                            // resizeMode : 'cover',
                            // position: 'absolute',
                            width: 200,
                            height: 200,
                        }}
                        source={require('../../../assets/images/logo.png')}
                    />
                </View>
                <Text style={_styles.label}>Log in</Text>
                <View style={_styles.formControls}>
                    <TextField
                        tintColor="#FFF"
                        baseColor="#FFF"
                        label="Username"
                        value={username.value}
                        error={username.error}
                        style={_styles.textFields}
                        onChangeText={text => this.setCredentials('username', text)}
                    />

                    <TextField
                        tintColor="#FFF"
                        baseColor="#FFF"
                        label="Passwords"
                        value={password.value}
                        error={password.error}
                        style={_styles.textFields}
                        onChangeText={text => this.setCredentials('password', text)}
                    />

                    <View style={_styles.buttonsWrapper}>
                        <Button
                            title="Login"
                            style={_styles.buttons}
                            onPress={this.onPressSignIn}
                            titleStyle={_styles.titleStyle}
                            // onLongPress={() => {
                            //     Alert.alert(
                            //         'Change API',
                            //         '...',
                            //         [
                            //             {
                            //                 text: 'OK',
                            //                 onPress: () => {
                            //                     this.props.navigation.navigate('Login');
                            //                 },
                            //             },
                            //             {
                            //                 text: 'Cancel',
                            //                 onPress: () => {},
                            //                 style: 'cancel',
                            //             },
                            //         ],
                            //         {cancelable: false},
                            //     );
                            // }}
                        />
                        <Button
                            title="Sign up"
                            style={_styles.buttons}
                            titleStyle={_styles.titleStyle}
                            onPress={() => this.props.navigation.navigate('Registration')}
                        />
                    </View>
                </View>
            </View>
        );
    }
}
const mapStateToProps = store => ({
    user : getUser(store),
});
const mapDispatchToProps = dispatch => ({
    login : credentials => dispatch(UserService.login(credentials)),
    setCurrentPath : (path) => dispatch(SystemActions.setCurrentPath(path)),
    setApi : (api) => dispatch(SystemActions.setAPI(api)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
