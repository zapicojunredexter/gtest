import React from 'react';
import { connect } from 'react-redux';
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import BookingService from '../../../services/bookings.service';
import TicketModal from './ticket.modal';

const styles = StyleSheet.create({
    container : {
        flex: 1,
    }
});

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
        this.state = {
            selected : null
        }
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
                data : store.bookings.userBookings.filter(booking => booking.Status !== 'Finished'),
            },
            {
                title : 'PREVIOUS TRIPS',
                data : store.bookings.userBookings.filter(booking => booking.Status === 'Finished'),
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