import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  TextInput
} from 'react-native';
import DatePicker from '../../../components/date.picker';
import AuthService from '../../../services/auth.service';

class Registration extends React.Component<> {
    state = {
        username : 'junre@yah.com',
        password : 'junrejunre',
        firstName: 'JunRe',
        lastName: 'ZapiCo',
        contactNum: '1231231',
        birthDate: '',
        gender: 'male',
    }
    render() {
        return (
        <View>
            <TextInput
                placeholder="Email"
                onChangeText={(text) => this.setState({ username : text })}
                value={this.state.username}
                style={{width : '100%'}}
            />
            <TextInput
                placeholder="Password"
                onChangeText={(text) => this.setState({ password : text })}
                value={this.state.password}
                style={{width : '100%'}}
            />
            <TextInput
                placeholder="First Name"
                onChangeText={(text) => this.setState({ firstName : text })}
                value={this.state.firstName}
                style={{width : '100%'}}
            />
            <TextInput
                placeholder="Last Name"
                onChangeText={(text) => this.setState({ lastName : text })}
                value={this.state.lastName}
                style={{width : '100%'}}
            />
            <DatePicker
                onValueChange={date => this.setState({ birthDate: date})}
                value={this.state.birthDate}
                placeholder="Birth Date"
            />
            <TextInput
                placeholder="Contact Number"
                onChangeText={(text) => this.setState({ contactNum : text })}
                value={this.state.contactNum}
                style={{width : '100%'}}
            />
            <TextInput
                placeholder="Gender"
                onChangeText={(text) => this.setState({ gender : text })}
                value={this.state.gender}
                style={{width : '100%'}}
            />
            <Text>You are in REGISTRATION PAGE</Text>
            <Button title="REGISTER"
                onPress={() => {
                    // try{
                        this.props.registerAccount(
                            this.state.username,
                            this.state.password,
                            {
                                FirstName : this.state.firstName,
                                LastName : this.state.lastName,
                                BirthDate : this.state.birthDate,
                                ContactNum : this.state.contactNum,
                                Gender : this.state.gender,
                            }).catch(error => alert(error.message));
                        // this.props.registerAccount("now@gmail.com","nowgmail",{name : "now", age : 21, gender : "M"}).catch(error => alert(error.message));
                        // this.props.registerAccount({
                        //     username : 'testUsername',
                        //     password : 'testPassword',
                        // }).then(res => alert("SUCCESS")).catch(error => alert(error.message));
                    // }catch(err){
                    //     alert("ZXCs"+err.message);
                    // }
                }}
            />
        </View>
        );
    }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
    login : (params) => dispatch(AuthService.login(params)),
    registerAccount : (username, password, params) => dispatch(AuthService.registerAccount(username, password, params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
