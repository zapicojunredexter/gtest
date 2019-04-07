import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";

const styles = StyleSheet.create({
    container : {
        // flex : 1,
        backgroundColor : 'green',
    },

});

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        const { modalProps, route, schedule, onPressConfirm } = this.props;
        return (
            <Modal {...modalProps}>
                <View style={styles.container}>
                    <Text>ROUTE : {route && route.Route}</Text>
                    <Text>SCHEDULE : {schedule && schedule.DepartureTime}</Text>
                    <Button
                        title="CONFIRM"
                        onPress={onPressConfirm}
                    />
                </View>
            </Modal>
        );
    }
}

Container.defaultProps = {
};

const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);