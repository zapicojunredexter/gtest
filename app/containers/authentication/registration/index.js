import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  BackHandler,
} from 'react-native';
import DatePicker from '../../../components/date.picker';
import RadioButton from '../../../components/radio.button';
import AuthService from '../../../services/auth.service';
import CombineService from '../../../services/combine.service';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    genderWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 5,
    }
});

class Registration extends React.Component<> {
    state = {
        // username : 'junre@yah.com',
        // password : 'junrejunre',
        // firstName: 'JunRe',
        // lastName: 'ZapiCo',
        // contactNum: '1231231',
        // birthDate: '',
        username : '',
        password : '',
        firstName: '',
        lastName: '',
        contactNum: '',
        birthDate: '',

        gender: 'male',
        isLoading: false,
    }

    constructor(props){
        super(props);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton = () => {
        // return true;
        this.props.navigation.goBack(null);
    };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }
    render() {
        const isValid = this.state.username && this.state.password && this.state.firstName && this.state.lastName && this.state.contactNum && this.state.birthDate && this.state.gender;
        return (
        <View style={styles.mainContainer}>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,justifyContent:'center'}}>
                    <Text>Email</Text>
                </View>
                <View style={{flex: 2}}>
                    <TextInput
                        placeholder="Email"
                        onChangeText={(text) => this.setState({ username : text })}
                        value={this.state.username}
                        style={{width : '100%'}}
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,justifyContent:'center'}}>
                    <Text>Password</Text>
                </View>
                <View style={{flex: 2}}>
                    <TextInput
                        placeholder="Password"
                        onChangeText={(text) => this.setState({ password : text })}
                        value={this.state.password}
                        style={{width : '100%'}}
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,justifyContent:'center'}}>
                    <Text>First Name</Text>
                </View>
                <View style={{flex: 2}}>
                    
                    <TextInput
                        placeholder="First Name"
                        onChangeText={(text) => this.setState({ firstName : text })}
                        value={this.state.firstName}
                        style={{width : '100%'}}
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,justifyContent:'center'}}>
                    <Text>Last Name</Text>
                </View>
                <View style={{flex: 2}}>
                    <TextInput
                        placeholder="Last Name"
                        onChangeText={(text) => this.setState({ lastName : text })}
                        value={this.state.lastName}
                        style={{width : '100%'}}
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,justifyContent:'center'}}>
                    <Text>Birth Date</Text>
                </View>
                <View style={{flex: 2}}>
                    <DatePicker
                        onValueChange={date => this.setState({ birthDate: date})}
                        value={this.state.birthDate}
                        placeholder="Birth Date"
                        style={{
                            marginTop: 15,
                            marginBottom: 3,
                            borderBottomWidth: 1,
                            borderColor: 'black'
                        }}
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,justifyContent:'center'}}>
                    <Text>Gender</Text>
                </View>
                <View style={{flex: 2}}>
                    
                    <View style={styles.genderWrapper}>
                        <Text>Male</Text>
                        <RadioButton
                            checkboxColor="#0B5173"
                            selected={this.state.gender === 'male'}
                            onPress={() => this.setState({gender:'male'})}
                        />
                        <Text>Female</Text>
                        <RadioButton
                            checkboxColor="#0B5173"
                            selected={this.state.gender === 'female'}
                            onPress={() => this.setState({gender:'female'})}
                        />
                    </View>
                </View>
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{flex: 1,justifyContent:'center'}}>
                    <Text>Contact Number</Text>
                </View>
                <View style={{flex: 2}}>
                    <TextInput
                        placeholder="Contact Number"
                        onChangeText={(text) => this.setState({ contactNum : text })}
                        value={this.state.contactNum}
                        style={{width : '100%'}}
                    />
                </View>
            </View>
            
            
            
            <Button title={`${this.state.isLoading ? `LOADING...` : `SUBMIT`}`}
                disabled={this.state.isLoading || !isValid}
                onPress={() => {
                        this.setState({isLoading: true});
                        this.props.registerAccount(
                            this.state.username,
                            this.state.password,
                            {
                                FirstName : this.state.firstName,
                                LastName : this.state.lastName,
                                BirthDate : this.state.birthDate,
                                ContactNumber : this.state.contactNum,
                                Gender : this.state.gender,
	                            AccountType: "Commuter"
                            }
                        )
                        .then(() => {
                            this.setState({isLoading: false});
                            this.props.navigation.navigate('Home');
                            this.props.masterSnap();
                        })
                        .catch(error => {
                            this.setState({isLoading: false});
                            alert(error.message);
                        });
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
    registerAccount : (username, password, params) => dispatch(AuthService.registerAccount(username, password, params)),
    masterSnap : () => dispatch(CombineService.masterSnap()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
