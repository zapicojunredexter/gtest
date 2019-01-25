import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

const _style = StyleSheet.create({
    textInputWrapper : {
        width : '100%',
    },
    defaultTxtInput: {
        borderWidth : 0,
        height : 40,
        color : 'white',
    },
    errorMessage : {
        color : 'red',
    },
});

export default class CustomTextInput extends React.PureComponent<> {
    render() {
        const { style, underlineColorAndroid, error, wrapperStyle } = this.props;
        return (
            <View style={[_style.textInputWrapper, wrapperStyle]}>
                <TextInput
                    underlineColorAndroid={underlineColorAndroid}
                    {...this.props}
                    style={[_style.defaultTxtInput,style]}
                />
                <Text style={_style.errorMessage}>{error}</Text>
            </View>
        );
    }
}

CustomTextInput.defaultProps = {
    underlineColorAndroid : 'transparent',
}