import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import styles from '../../containers/authentication/login/styles';

const _style = StyleSheet.create({
});

export default class CustomButton extends React.PureComponent<> {
    render() {
        const { title, children, titleStyle } = this.props;
        return (
            <TouchableOpacity {...this.props}>
                {children || <Text style={titleStyle}>{title}</Text>}
            </TouchableOpacity>
        );
    }
}

CustomButton.defaultProps = {
}