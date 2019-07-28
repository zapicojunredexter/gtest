import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import GridView from 'react-native-gridview';

const styles = StyleSheet.create({
    container : {
        // flex : 1,
        backgroundColor : 'white',
        padding: 5,
    },
    seat: {
        padding: 5,
        borderWidth: 0,
    },
    availableSeat: {
        backgroundColor: '#81cc74',
        textAlign: 'center',
        margin: 2,
        height: 22,
    },
    takenSeat: {
        backgroundColor: '#d66d6d',
        textAlign: 'center',
        margin: 2,
        height: 22,
    },
    selectedSeat: {
        backgroundColor: '#87ceeb',
        textAlign: 'center',
        margin: 2,
        height: 22,
    },
    isCant: {
        backgroundColor: 'silver',
        textAlign: 'center',
        margin: 2,
        height: 22,
    }
});

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
        this.state = {
            seats : [],
        };
    }

    handleOnConfirm = () => {
        const { modalProps, route, schedule, onPressConfirm } = this.props;
        const {
            seats
        } = this.state;
        const additionalData = {
            Seats : seats
        };
        onPressConfirm(additionalData);
    }

    handleAddSeat = (seat) => {
        const {seats} = this.state;
            
        if(seats.includes(seat.key)) {
            const newSeats = [...this.state.seats];
            newSeats = newSeats.filter(seatItem => seatItem !== seat.key);
            this.setState({seats : newSeats})
        } else {
            const newSeats = [...this.state.seats];
            newSeats.push(seat.key);
            
            this.setState({seats : newSeats})
        }
    }

    isSelected = (key) => {
        const seats = this.state.seats;
        return seats.includes(key);
    }

    render() {
        const { modalProps, selectedTrip, onPressConfirm } = this.props;
        const {
            seats
        } = this.state;
        const seatStatuses = selectedTrip && selectedTrip.Vehicle && selectedTrip.Vehicle.SeatsStatus || {};
        const availableSeatsDetails = selectedTrip && selectedTrip.Vehicle && Object.values(selectedTrip.Vehicle.SeatsDetails) || [];
        const route = selectedTrip && selectedTrip.Route && selectedTrip.Route.Route;
        const schedule = selectedTrip && selectedTrip.Schedule && `${selectedTrip.Schedule.DepartDate} ${selectedTrip.Schedule.DepartTime}`;
        return (
            <Modal {...modalProps}>
                <View style={styles.container}>
                    <Text style={{margin: 10,}}>ROUTE : {route}</Text>
                    <Text style={{margin: 10,}}>SCHEDULE : {schedule}</Text>
                    <View style={{
                        width: '100%', 
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        padding: 5,
                    }}>
                        
                        {availableSeatsDetails.map(seat => {
                            const isTaken = seatStatuses[seat.key];
                            const isSelected = this.isSelected(seat.key);
                            return (
                                <TouchableOpacity
                                    disabled={isTaken || seat.cantReserve}
                                    onPress={() => this.handleAddSeat(seat)}
                                    style={[seats.seat, {width: seat.width}]}
                                >
                                    <Text
                                        style={[
                                            isTaken ? styles.takenSeat : styles.availableSeat,
                                            isSelected && styles.selectedSeat,
                                            seat.cantReserve && styles.isCant
                                        ]}>
                                        {`${seat.key || ``}`}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    {/*
                    <TextInput
                        value={seats}
                        onChangeText={(value) => this.setState({seats : value})}
                    />
                    */}
                    
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