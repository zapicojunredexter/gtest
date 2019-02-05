import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';

const _style = StyleSheet.create({
});

export default class SwitchComponent extends React.PureComponent<> {
    render() {
        return (
            <Switch trackColor="red" {...this.props} />
        );
    }
}

SwitchComponent.defaultProps = {
};
