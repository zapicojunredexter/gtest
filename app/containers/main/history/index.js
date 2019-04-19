import React from 'react';
import { connect } from 'react-redux';
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import BookingService from '../../../services/bookings.service';
import TicketModal from './ticket.modal';

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
    }
});

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
        this.state = {
            selected : null
        }
    }

    renderTripDetails = ({item}) => {
        const isTravelling = item.Status === "Travelling";
        const isCancelled = item.Status === "Cancelled";
        const renderTripRecord = (label, value) => (
            <View style={styles.tripRowComponentPair}>
                <Text style={styles.tripRowComponentPairLabel}>{label || '-'}</Text>
                <Text style={styles.tripRowComponentPairValue}>{value || '-'}</Text>
            </View>
        );
        return (
            <TouchableOpacity
                onPress={() => {
                    this.setState({ selected : item});
                }}
                style={[
                    styles.tripRowContainer,
                    isTravelling && styles.tripRowTravelling,
                    isCancelled && styles.tripRowCancelled
                ]}
            >
                {renderTripRecord('Vehicle Number',item.TripDate)}
                {renderTripRecord('Route',item.Route.Route)}
                {renderTripRecord('Departure Time',item.VehiclePlateNo)}
                {renderTripRecord('Departure', `${item.CommutersCount} / ${item.CommutersTotal}`)}
                {renderTripRecord('Booked', `${item.Schedule}`)}
            </TouchableOpacity>
        );
    }

    render() {
        const { sections, fetchCommuterHistory } = this.props;
        const { selected } = this.state;
        return (
            <View style={styles.container}>
                <TicketModal
                    modalProps={{
                        isVisible :  !!selected,
                        onBackdropPress : () => this.setState({selected : null})
                    }}
                    onViewDetails={() => {
                        const itemId = this.state.selected.Id;
                        this.setState({ selected : null });
                        this.props.navigation.navigate('HistoryDetails',{bookingId: itemId});
                        
                        // if(isCommuter) {
                        //     this.props.navigation.navigate('HistoryDetails',{bookingId: itemId});
                        // } else {
                        //     this.props.navigation.navigate('DriverTripDetails', {tripId: itemId});
                        // }
                    }}
                    closeModal={() => this.setState({ selected : null })}
                    bookingDetails={selected}
                />
                <SectionList
                    stickySectionHeadersEnabled
                    renderItem={({item, index, section}) => (
                        <TouchableOpacity
                            onPress={() => {
                                this.setState({ selected : item});
                            }}
                        >
                            <Text key={index}>{JSON.stringify(item)}</Text>
                        </TouchableOpacity>
                    )}
                    renderItem={this.renderTripDetails}
                    renderSectionHeader={({section: {title}}) => (
                        <View style={{backgroundColor:'white',padding : 7}}>
                            <Text style={{fontWeight: 'bold'}}>{title}</Text>
                        </View>
                    )}
                    sections={sections}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
        );
    }
}


const mapStateToProps = store => {
    return {
        sections : [
            {
                title : 'UPCOMING BOOKED TRIPS',
                data : store.bookings.userBookings.filter(booking => booking.Status === 'Waiting' || booking.Status === 'Travelling'),
            },
            {
                title : 'PREVIOUS TRIPS',
                data : store.bookings.userBookings.filter(booking => booking.Status === 'Finished' || booking.Status === 'Cancelled'),
            }
        ],
    };
    /*
    const { user } = store;
    const bookings = [
        {
            title : 'UPCOMING BOOKED TRIPS',
            data : store.bookings.userBookings.filter(booking => booking.Status !== 'Finished'),
        },
        {
            title : 'PREVIOUS TRIPS',
            data : store.bookings.userBookings.filter(booking => booking.Status === 'Finished'),
        }
    ];
    const trips = [
        {
            title : 'UPCOMING TRIPS',
            data : store.trips.trips.filter(booking => booking.Status !== 'Finished'),
        },
        {
            title : 'PREVIOUS TRIPS',
            data : store.trips.trips.filter(booking => booking.Status === 'Finished'),
        }
    ];
    if(!user){
        return {};
    }
    return {
        sections : user.AccountType === 'Commuter' ? bookings : trips,
        isCommuter : user.AccountType === 'Commuter',
    };
    */
}
const mapDispatchToProps = dispatch => ({
    fetchCommuterHistory : () => dispatch(BookingService.fetchCommuterHistory())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
// export default Container;