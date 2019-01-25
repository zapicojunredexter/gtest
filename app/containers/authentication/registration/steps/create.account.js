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
});

type Props = {
};

export default class CreateAccount extends React.PureComponent<Props> {
    constructor(props) {
        super(props);
        this.state = {
            fname : { value : '', errorMessage : ''},
            mname : { value : '', errorMessage : ''},
            lname : { value : '', errorMessage : ''},
            phone : { value : '', errorMessage : ''},
            email : { value : '', errorMessage : ''},
        }
    }

    setFields = (key, value) => {
        const currentKeyState = this.state[key];
        this.setState({[key] : { ...currentKeyState, value }});
    }

    render() {
        const {
            fname,
            mname,
            lname,
            phone,
            email
        } = this.state;
        return (
            <View style={_styles.createAccountContainer}>
                <TextInput
                    value={fname.value}
                    placeholder="First Name"
                    style={_styles.textInput}
                    error={fname.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChange={(value) => this.setFields('fname', value)}
                />
                <TextInput
                    value={mname.value}
                    placeholder="Middle Name"
                    style={_styles.textInput}
                    //error={mname.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChange={(value) => this.setFields('mname', value)}
                />
                <TextInput
                    value={lname.value}
                    placeholder="Last Name"
                    style={_styles.textInput}
                    //error={lname.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChange={(value) => this.setFields('lname', value)}
                />
                <TextInput
                    value={phone.value}
                    placeholder="Phone"
                    style={_styles.textInput}
                    //error={phone.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChange={(value) => this.setFields('phone', value)}
                />
                <TextInput
                    value={email.value}
                    placeholder="Email"
                    style={_styles.textInput}
                    error={email.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChange={(value) => this.setFields('email', value)}
                />
            </View>
        );
    }
}
