import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import TextInput from '../../../../components/text.input';
import { colors } from '../../../../constants/colors';

const _styles = StyleSheet.create({
    createAccountContainer : {
        width : '100%',
        marginTop : 10,
    },
    textInput : {
        backgroundColor : '#79ACC9',
        paddingLeft : 10,
    },
    codeTxtInput : {
        backgroundColor : colors.seculacer.main,
        width : '70%',
        paddingLeft : 10,
        textAlign : 'center',
    },
    codeTxtInputWrapper : {
        marginBottom : 5,
        justifyContent : 'center',
        alignItems : 'center',
    },
    textInputWrapper : {
        marginBottom : 5,
    },
    label : {
        color : colors.fontColor,
        fontSize : 15,
        marginBottom : 5,
    },
    footnote : {
        color : colors.fontColor,
        fontSize : 12,
        marginTop : 5,
    },
    fieldSet : {
        backgroundColor : '#79ACC9',
        alignItems : 'center',
        padding : 10,
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

                <View style={_styles.fieldSet}>
                    <Text style={_styles.label}>Enter 4 digit code</Text>
                    <TextInput
                        value={password2.value}
                        placeholder="••••"
                        style={_styles.codeTxtInput}
                        error={password2.errorMessage}
                        placeholderTextColor="#FFF"
                        wrapperStyle={_styles.codeTxtInputWrapper}
                        onChange={(value) => this.setFields('password2', value)}
                    />
                    <Text style={_styles.label}>Confirm code</Text>
                    <TextInput
                        value={password2.value}
                        placeholder="••••"
                        style={_styles.codeTxtInput}
                        error={password2.errorMessage}
                        placeholderTextColor="#FFF"
                        wrapperStyle={_styles.codeTxtInputWrapper}
                        onChange={(value) => this.setFields('password2', value)}
                    />
                </View>

                <Text style={_styles.footnote}>
                    By clicking Done you have agreed with the 
                    <Text style={{color : 'yellow'}}>{' '}Terms and Conditions{' '}</Text>
                    of Seculace
                </Text>
            </View>
        );
    }
}
