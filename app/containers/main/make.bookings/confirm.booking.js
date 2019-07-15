import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
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
            seats : "1",
        };
    }

    handleOnConfirm = () => {
        const { modalProps, route, schedule, onPressConfirm } = this.props;
        const {
            seats
        } = this.state;
        const additionalData = {
            Seats : [seats]
        };
        onPressConfirm(additionalData);
    }


    render() {
        const { modalProps, route, selectedTrip, onPressConfirm } = this.props;
        const {
            seats
        } = this.state;
        const availableSeats = selectedTrip && selectedTrip.Vehicle && Object.keys(selectedTrip.Vehicle.Seats);

        return (
            <Modal {...modalProps}>
                <View style={styles.container}>
                    <Text>ROUTE : {route && route.Route}</Text>
                    <Text>SCHEDULE : {selectedTrip && selectedTrip.Schedule && selectedTrip.Schedule.DepartDate}</Text>
                    <Text>SEATS : {JSON.stringify(availableSeats)}</Text>
                    
                    <TextInput
                        value={seats}
                        onChangeText={(value) => this.setState({seats : value})}
                    />
                    <Button
                        title="CONFIRM"
                        onPress={this.handleOnConfirm}
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