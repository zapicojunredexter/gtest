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
            selectedBooking : null
        }
    }

    render() {
        const { sections, fetchCommuterHistory } = this.props;
        const { selectedBooking } = this.state;
        return (// Example 1 (Homogeneous Rendering)
            <View style={styles.container}>
                <TicketModal
                    modalProps={{
                        isVisible :  !!selectedBooking,
                        onBackdropPress : () => this.setState({selectedBooking : null})
                    }}
                    onViewDetails={() => {
                        const bookingId = this.state.selectedBooking.Id;
                        this.setState({ selectedBooking : null });
                        this.props.navigation.navigate('HistoryDetails',{bookingId});
                    }}
                    closeModal={() => this.setState({ selectedBooking : null })}
                    bookingDetails={selectedBooking}
                />
                <SectionList
                    stickySectionHeadersEnabled
                    renderItem={({item, index, section}) => (
                        <TouchableOpacity
                            onPress={() => this.setState({ selectedBooking : item})}
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

const mapStateToProps = store => ({
    sections : [
        {
            title : 'UPCOMING BOOKED TRIPS',
            // data : [
            //     'asd',
            //     'asd',
            //     'asd',
            //     'asd',
            // ]
            data : store.bookings.userBookings.filter(booking => booking.Status !== 'Finished'),
        },
        {
            title : 'PREVIOUS TRIPS',
            data : store.bookings.userBookings.filter(booking => booking.Status === 'Finished'),
            // data : [
            //     'zxc',
            //     'zxc',
            //     'zxc',
            //     'zx',
            // ]
        }
    ]
});
const mapDispatchToProps = dispatch => ({
    fetchCommuterHistory : () => dispatch(BookingService.fetchCommuterHistory())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
// export default Container;