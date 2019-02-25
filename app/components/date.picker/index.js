import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  DatePickerAndroid
} from 'react-native';

import { colors } from '../../constants/colors';

const _style = StyleSheet.create({
    pickerWrapper : {
        width : '100%',
    },
    defaultPicker: {
        borderWidth : 0,
        height : 40,
        justifyContent : 'center',
    },
    defaultTxtInput: {
        borderWidth : 0,
        height : 40,
        color : colors.fontColor,
        padding : 10,
    },
    errorMessage : {
        color : 'red',
    },
});

export default class CustomPicker extends React.PureComponent<> {
    constructor(props){
        super(props);
    }
    openDatePicker = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
            date: new Date()
            });
            if(action === 'dateSetAction'){
                const { onValueChange } = this.props;
                const monthString = `0${month + 1}`.slice(-2);
                const dayString = `0${day}`.slice(-2);
                const yearString  = `0${year}`.slice(-4);
                onValueChange(`${monthString}-${dayString}-${yearString}`);
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }
    render() {
        const { style, value, placeholder, error, wrapperStyle } = this.props;
        return (
            <TouchableOpacity onPress={this.openDatePicker} style={[_style.pickerWrapper, wrapperStyle]}>
                <Text style={[_style.defaultTxtInput,style]}>{value || placeholder }</Text>
                <Text style={_style.errorMessage}>{error}</Text>
            </TouchableOpacity>
        );
    }
}

CustomPicker.defaultProps = {
    choices : [],
}