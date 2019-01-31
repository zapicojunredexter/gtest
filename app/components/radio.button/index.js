import React, {Component} from 'react';
import {Modal, TouchableOpacity, StyleSheet, View, Alert} from 'react-native';
import { colors } from '../../constants/colors';
const _styles = StyleSheet.create({
    modalBackgroundStyle : {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default class RadioButton extends Component {
    render() {
        const { style, selected, onPress } = this.props;
        return (
            <TouchableOpacity
                style={[{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: colors.responder.mainHeader,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, style]}
                onPress={onPress}
            >
                {
                selected ?
                    <View
                        style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: colors.responder.mainHeader,
                        }}
                    />
                    : null
                }
            </TouchableOpacity>
        );
    }
}