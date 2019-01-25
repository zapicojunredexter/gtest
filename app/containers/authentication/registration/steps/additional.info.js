import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Picker
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

export default class AdditionalInfo extends React.PureComponent<Props> {
    constructor(props) {
        super(props);
        this.state = {
            province : { value : '', errorMessage : ''},
            city : { value : '', errorMessage : ''},
            barangay : { value : '', errorMessage : ''},
            street : { value : '', errorMessage : ''},
        }
    }

    setFields = (key, value) => {
        const currentKeyState = this.state[key];
        this.setState({[key] : { ...currentKeyState, value }});
    }

    render() {
        const {
            province,
            city,
            barangay,
            street,
        } = this.state;
        return (
            <View style={_styles.createAccountContainer}>
                <Text style={_styles.label}>Set up your address</Text>
                <Picker
  selectedValue={this.state.language}
  style={_styles.textInput}
  onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
                <TextInput
                    value={province.value}
                    placeholder="Province"
                    style={_styles.textInput}
                    error={province.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChange={(value) => this.setFields('province', value)}
                />
                <TextInput
                    value={city.value}
                    placeholder="City / Town"
                    style={_styles.textInput}
                    error={city.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChange={(value) => this.setFields('city', value)}
                />
                <TextInput
                    value={barangay.value}
                    placeholder="Barangay / Sitio"
                    style={_styles.textInput}
                    error={barangay.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChange={(value) => this.setFields('barangay', value)}
                />
                <TextInput
                    value={street.value}
                    placeholder="Street"
                    style={_styles.textInput}
                    error={street.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChange={(value) => this.setFields('street', value)}
                />
            </View>
        );
    }
}
