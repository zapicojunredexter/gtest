import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import AuthService from '../../../services/auth.service';
import CombineService from '../../../services/combine.service';
import userService from '../../../services/user.service';

type Props = {
};

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        justifyContent: 'center',
        padding: 20,
    },
    iconContainer: {
        alignItems: 'center'
    },
    marginComponent: {
        marginBottom: 10,
        width : '100%',
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#0B5173',
        justifyContent: 'center',
        alignItems: 'center'
    },
    signUpButton: {
        marginTop: 20,
    },
    signUpTxt: {
        textAlign: 'center'
    }
});

class Login extends React.Component<Props> {
    state = {
        // username : 'junre@yah.com',
        // password : 'junrejunre',
        username : '',
        password : '',
        isLoading : false,
    }
    login = async () => {
        const { login } = this.props;
        const { username, password } = this.state;
        this.setState({isLoading:true});
        
        login(username, password)
            .then(res => {
                this.props.patchNotifToken()
                    .then(() => {})
                    .catch(() => {});
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
            <View style={styles.mainContainer}>
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <MaterialCommunityIcons name="van-passenger" size={90} color="#fff" style={{ marginLeft : 5 }} />
                    </View>
                </View>
                <TextInput
                    onChangeText={(text) => this.setState({ username : text })}
                    value={this.state.username}
                    placeholder="Email"
                    style={styles.marginComponent}
                />
                <TextInput
                    onChangeText={(text) => this.setState({ password : text })}
                    value={this.state.password}
                    placeholder="Password"
                    style={styles.marginComponent}
                    secureTextEntry
                />
                <Button
                    title={isLoading ? "LOGGING IN ..." : "LOGIN"}
                    onPress={this.login}
                    disabled={isLoading}
                />
                <TouchableOpacity
                    style={styles.signUpButton}
                    onPress={() => this.props.navigation.navigate('Registration')}
                >
                    <Text style={styles.signUpTxt}>No account? Sign-up here!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
    patchNotifToken: () => dispatch(userService.patchNotifToken()),
    login : (username, password) => dispatch(AuthService.login(username, password)),
    masterSnap : () => dispatch(CombineService.masterSnap()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
