import React from 'react';
import { connect } from 'react-redux';
import {
  WebView,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';

import { colors } from '../../constants/colors';

const _style = StyleSheet.create({
    textInputWrapper : {
        width : '100%',
    },
    defaultTxtInput: {
        borderWidth : 0,
        height : 40,
        color : colors.fontColor,
    },
    errorMessage : {
        color : 'red',
    },
});

export default class CustomWebView extends React.PureComponent<> {
    render() {
        return (
            <WebView {...this.props}/>
        );
    }
}

CustomWebView.defaultProps = {
    underlineColorAndroid : 'transparent',
}