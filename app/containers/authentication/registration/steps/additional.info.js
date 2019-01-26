import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  // Picker
} from 'react-native';

import TextInput from '../../../../components/text.input';
import Picker from '../../../../components/picker';
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
    textInputWrapper : {
        marginBottom : 5,
    },
    label : {
        color : colors.fontColor,
        fontSize : 15,
        marginBottom : 5,
    },
    sidenote : {
        color : colors.fontColor,
        textAlign : 'center',
    },
    lineSeparator : {
        height : 1,
        backgroundColor : '#79ACC9',
        marginTop : 10,
        marginBottom : 10,
    }
});

type Props = {
};

export default class AdditionalInfo extends React.PureComponent<Props> {
    constructor(props) {
        super(props);
        this.state = {
            birthdate : { value : '', errorMessage : ''},
            gender : { value : '', errorMessage : ''},

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
            gender,
            province,
            city,
            barangay,
            street,
            birthdate,
        } = this.state;

        return (
            <View style={_styles.createAccountContainer}>
                <Picker
                    placeholder="Birthdate"
                    style={_styles.textInput}
                    error={birthdate.errorMessage}
                    selectedValue={birthdate.value}
                    wrapperStyle={_styles.textInputWrapper}
                    onValueChange={(value) => this.setFields('birthdate', value)}
                    choices={[
                        {label : 'Birthday 1', value : 'male'},
                        {label : 'Birthday 2', value : 'female'}
                    ]}
                />
                <Picker
                    placeholder="Select Gender"
                    style={_styles.textInput}
                    error={gender.errorMessage}
                    selectedValue={gender.value}
                    wrapperStyle={_styles.textInputWrapper}
                    onValueChange={(value) => this.setFields('gender', value)}
                    choices={[
                        {label : 'Male', value : 'male'},
                        {label : 'Female', value : 'female'}
                    ]}
                />
                <Text style={_styles.sidenote}>ALWAYS MAKE YOUR INFO UPDATED</Text>
                <View style={_styles.lineSeparator} />
                <Text style={_styles.label}>Set up your address</Text>
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
