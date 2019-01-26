import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  Picker,
  StyleSheet,
} from 'react-native';

import { colors } from '../../constants/colors';

const _style = StyleSheet.create({
    pickerWrapper : {
        width : '100%',
    },
    defaultPicker: {
        borderWidth : 0,
        height : 40,
        color : colors.fontColor,
    },
    errorMessage : {
        color : 'red',
    },
});

export default class CustomPicker extends React.PureComponent<> {
    render() {
        const { style, choices, error, wrapperStyle, placeholder } = this.props;
        return (
            <View style={[_style.pickerWrapper, wrapperStyle]}>
                <Picker
                    {...this.props}
                    style={[_style.defaultPicker,style]}
                >
                    {choices.map(choice => 
                        <Picker.Item key={choice.value} {...choice} />
                    )}
                </Picker>
                <Text style={_style.errorMessage}>{error}</Text>
            </View>
        );
    }
}

CustomPicker.defaultProps = {
    choices : [],
}