import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Button,
  StyleSheet,
  DatePickerAndroid
} from 'react-native';
import Picker from 'react-native-picker';

/*
let data = [];
for(var i=0;i<100;i++){
    data.push(i);
}

Picker.init({
    pickerData: data,
    selectedValue: [59],
    onPickerConfirm: data => {
        console.log(data);
    },
    onPickerCancel: data => {
        console.log(data);
    },
    onPickerSelect: data => {
        console.log(data);
    }
});
Picker.show();
*/
export default class CustomPicker extends React.PureComponent<> {
    constructor(props){
        super(props);
    }

    mapPropsToChoices = () => {

    }

    openPicker = () => {
        // { key, value, displayValue }
        const { choices, selectedValue, onSelect } = this.props;

        Picker.init({
            pickerData: choices,
            selectedValue: [selectedValue],
            onPickerConfirm: data => {
                onSelect(data[0]);
            },
            onPickerCancel: data => {
            },
            onPickerSelect: data => {
            },
            pickerConfirmBtnText : "Ok",
            pickerCancelBtnText : "Cancel",
        });
        Picker.show();
    }

    render() {
        const { selectedValue } = this.props;
        return <Text {...this.props} onPress={this.openPicker}>{selectedValue || '-'}</Text>

    }
}

CustomPicker.defaultProps = {
    choices : [],
}