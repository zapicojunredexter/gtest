import React from 'react';
import { connect } from 'react-redux';
import { View, Text, SectionList } from 'react-native';
import BookingService from '../../../services/bookings.service';

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
        this.state = {
            fetching : false,
        }
    }

    render() {
        const { sections, fetchCommuterHistory } = this.props;
        const { fetching } = this.state;
        return (// Example 1 (Homogeneous Rendering)
            <SectionList
                // onRefresh={async () => {
                //     this.setState({fetching:true});
                //     await fetchCommuterHistory();
                //     this.setState({fetching:false});
                // }}
                // refreshing={fetching}
                stickySectionHeadersEnabled
                renderItem={({item, index, section}) => <Text key={index}>{JSON.stringify(item)}</Text>}
                renderSectionHeader={({section: {title}}) => (
                    <Text style={{fontWeight: 'bold'}}>{title}</Text>
                )}
                sections={sections}
                keyExtractor={(item, index) => item + index}
            />
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