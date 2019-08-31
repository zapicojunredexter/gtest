import React from 'react';
import { connect } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Button, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import BookingService from '../../../services/bookings.service';
import Pathing from '../../../components/map.view/pathing';

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    tripRowContainer : {
        borderRadius : 3,
        borderColor : 'silver',
        borderWidth : 1,
        marginBottom : 5,
        padding : 15,
        marginLeft : 10,
        marginRight : 10,
        marginTop : 10,
        marginBottom : 10,
    },
    tripRowComponentPair : {
        flexDirection : 'row',
    },
    tripRowComponentPairLabel : {
        fontWeight : 'bold',
        fontSize : 12,
    },
    tripRowComponentPairValue : {
        fontSize : 12,
        marginLeft : 10,
    },
    tripRowTravelling: {
        backgroundColor : '#87ceeb'
    },
    tripRowCancelled: {
        backgroundColor: '#f4a1a1',
    },

    mapContentsWrapper: {
        flex: 1,
    },
    routeNameWrapper: {
        justifyContent: 'center',
        paddingTop: 10,
    },
    routeName: {
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

class Container extends React.PureComponent<> {
   static navigationOptions = (({ navigation, screenProps }) => ({
        headerLeft : (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="ios-arrow-back" size={30} color="#fff" style={{ marginLeft : 10 }} />
            </TouchableOpacity>
        ),
        title : `BOOKING DETAILS`,
    }));

    state = {
        isFetching: true,
        booking: {},
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const { bookingId } = this.props.navigation.state.params;
        this.props.fetchBookingDetails(bookingId)
            .then(response => {
                this.setState({
                    isFetching: false,
                    booking: response.Booking,
                })
            })
            .catch(error => {
                alert(error.message);
            });
    }

    renderTripDetails = () => {
        const item = this.state.booking;
        const isTravelling = item && item.Status === "Travelling";
        const isCancelled = item && item.Status === "Cancelled";
        const renderTripRecord = (label, value) => (
            <View style={styles.tripRowComponentPair}>
                <Text style={styles.tripRowComponentPairLabel}>{label || '-'}</Text>
                <Text style={styles.tripRowComponentPairValue}>{value || '-'}</Text>
            </View>
        );
        const bookedDate = new Date(item.createdAt);
        return (
            <View
                style={[
                    styles.tripRowContainer,
                    isTravelling && styles.tripRowTravelling,
                    isCancelled && styles.tripRowCancelled
                ]}
            >
                {renderTripRecord('Driver Name',item && item.Trip && item.Trip.Driver && `${item.Trip.Driver.FirstName} ${item.Trip.Driver.LastName}`)}
                {renderTripRecord('Vehicle Number',item && item.Trip && item.Trip.Vehicle && `${item.Trip.Vehicle.PlateNumber}`)}
                {renderTripRecord('Route',item && item.Trip && item.Trip.Route && item.Trip.Route.Route)}
                {
                    // renderTripRecord('Departure Date',item && item.Trip && item.Trip.Schedule && item.Trip.Schedule.DepartDate)
                }
                {
                    // renderTripRecord('Departure Time',item && item.Trip && item.Trip.Schedule && item.Trip.Schedule.DepartTime)
                }
                {
                    renderTripRecord('Departure',item && item.Trip && item.Trip.Schedule && item.Trip.Schedule.DepartDate && item.Trip.Schedule.DepartTime && (new Date(`${item.Trip.Schedule.DepartDate} ${item.Trip.Schedule.DepartTime}`).toLocaleString()))
                }
                {renderTripRecord('Reserved Seat',item && item.Seats && (item.Seats.join(', ')))}
                {
                    // renderTripRecord('Booked', bookedDate && `${bookedDate.getMonth() + 1}-${bookedDate.getDate()}-${bookedDate.getFullYear()}`)
                    renderTripRecord('Booked', bookedDate && bookedDate.toLocaleString())
                    
                }
            </View>
        );
    }

    renderMap = () => {
        const item = this.state.booking;
        const Route = item && item.Trip && item.Trip.Route && item.Trip.Route.Route;
        return (
            <View style={styles.mapContentsWrapper}>
                {item && item.Trip && item.Trip.Route &&(
                    <Pathing route={item.Trip.Route} />
                )}
            </View>
        );
    }

    handleCancel = async () => {
        try{
            const item = this.state.booking;
            await this.props.cancelBooking(item.Id);
            ToastAndroid.show("Cancelled Booking",ToastAndroid.SHORT);
            this.fetchData();
        }catch(error){
            alert(error.message);
        }
    }
    render() {
        const item = this.state.booking;
        return (
            <View style={styles.container}>
                {this.renderTripDetails()}
                <Button
                    onPress={this.handleCancel}
                    disabled={!item || item && item.Status !== 'Waiting'}
                    title="CANCEL"
                />
                {this.renderMap()}
            </View>
        );
    }
}

const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
    fetchBookingDetails: bookingId => dispatch(BookingService.fetchBookingDetails(bookingId)),
    cancelBooking: bookingId => dispatch(BookingService.cancelBooking(bookingId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
// export default Container;