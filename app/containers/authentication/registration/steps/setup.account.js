import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import TextInput from '../../../../components/text.input';

const _styles = StyleSheet.create({
    createAccountContainer : {
        width : '100%',
        marginTop : 10,
    },
    textInput : {
        backgroundColor : '#79ACC9',
        paddingLeft : 10,
    },
    textInputWrapper : {
        marginBottom : 5,
    },
    label : {
        color : 'white',
        fontSize : 15,
        marginBottom : 5,
    },
});

type Props = {
};

export default class SetupAccount extends React.PureComponent<Props> {
    constructor(props) {
        super(props);
        this.state = {
            username : { value : '', errorMessage : ''},
            password : { value : '', errorMessage : ''},
            password2 : { value : '', errorMessage : ''},
        }
    }

    setFields = (key, value) => {
        const currentKeyState = this.state[key];
        this.setState({[key] : { ...currentKeyState, value }});
    }

    render() {
        const {
            username,
            password,
            password2,
        } = this.state;
        return (
            <View style={_styles.createAccountContainer}>
                <Text style={_styles.label}>Set up your address</Text>
                <TextInput
                    value={username.value}
                    placeholder="Username"
                    style={_styles.textInput}
                    error={username.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChange={(value) => this.setFields('username', value)}
                />
                <TextInput
                    value={password.value}
                    placeholder="Password"
                    style={_styles.textInput}
                    error={password.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChange={(value) => this.setFields('password', value)}
                />
                <TextInput
                    value={password2.value}
                    placeholder="Confirm password"
                    style={_styles.textInput}
                    error={password2.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChange={(value) => this.setFields('password2', value)}
                />
            </View>
        );
    }
}
