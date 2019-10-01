import React from 'react';
import { View, Text, StyleSheet, FlatList, SectionList, TouchableOpacity } from 'react-native';
import { CameraKitCameraScreen, CameraKitCamera } from 'react-native-camera-kit';
import QRCode from 'react-native-qrcode';
import Entypo from 'react-native-vector-icons/Entypo';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        // padding : 5,
    },
    flatListWrapper : {
        flex : 1,
        // padding : 10,
    },
    tripRowContainer : {
        borderRadius : 3,
        borderColor : 'silver',
        borderWidth : 1,
        marginBottom : 5,
        padding : 15,
    },
    tripRowContainer : {
        borderRadius : 3,
        borderColor : 'silver',
        borderWidth : 1,
        marginBottom : 5,
        padding : 15,
        margin: 10
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
    tripRowSelected : {
        backgroundColor : '#87ceeb'
    },

    cardContainer : {
        flexDirection : 'row',
        padding : 10,
        margin : 10,
        borderRadius : 3,
        borderWidth : 1,
        borderColor : 'silver'
    },
    cardIcon : {
        width: 50,
        height: 50,
        marginRight : 10,
    },
    cardContents : {
        flex : 1,
    },
    cardLabel : {
        fontSize : 12,
    },
    cardData : {
        fontSize : 16,
        fontWeight : 'bold',
    },
});
class Container extends React.PureComponent<> {
    static navigationOptions = {
        headerTitle : 'MY TRIPS',
    };

    constructor(props) {
        super(props);
    }

    renderTripRow = ({item}) => {
        const isTravelling = item.Status === "Travelling";
        const renderTripRecord = (label, value) => (
            <View style={styles.tripRowComponentPair}>
                <Text style={styles.tripRowComponentPairLabel}>{label || '-'}</Text>
                <Text style={styles.tripRowComponentPairValue}>{value || '-'}</Text>
            </View>
        );
        const seatsArray = item.Vehicle && item.Vehicle.Seats ? Object.values(item.Vehicle.Seats) : [];
        const takenSeats = seatsArray.filter(seat => seat).length;
        const totalSeats = seatsArray.length;
        console.log('adunay date', new Date(`${item.Schedule.DepartDate} 00:25`).toString());
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('ManageAttendees',{trip : item});
                }}
                style={[
                    styles.tripRowContainer,
                    isTravelling && styles.tripRowSelected
                ]}
            >
                {
                    renderTripRecord('Departure',item.Schedule && item.Schedule.DepartDate && item.Schedule.DepartTime && (new Date(`${item.Schedule.DepartDate} ${item.Schedule.DepartTime}`).toLocaleString()))
                }
                {
                    // renderTripRecord('Departure Date',item.Schedule && item.Schedule.DepartDate)
                }
                {
                    // renderTripRecord('Departure Time', `${item.Schedule && item.Schedule.DepartTime}`)
                }
                {renderTripRecord('Route',item.Route && item.Route.Route)}
                {renderTripRecord('Vehicle Plate Number',item.Vehicle && item.Vehicle.PlateNumber)}
                {renderTripRecord('Commuter Count', `${takenSeats} / ${totalSeats}`)}
                {renderTripRecord('Status',item.Status)}
            </TouchableOpacity>
        );
    }

    render() {
        const { trips } = this.props;
        const tripsWithSeats = this.props.allTrips.map(trip => {
            const vehicleSeats = trip.Vehicle.SeatsStatus;
            const arrVehicleSeats = Object.values(vehicleSeats);
            const truthy = arrVehicleSeats.filter(vehi => !!vehi);
            return {
                seats: truthy.length,
                price: trip.Price,
            };
        })
        const reduced = tripsWithSeats.reduce((acc,cur) => {
            return acc + (cur.price * cur.seats);
        }, 0);
        return (
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <Entypo name="wallet" size={50} color="black" style={styles.cardIcon} />
                    <View style={styles.cardContents}>
                        <Text style={styles.cardLabel}>
                            Earned
                        </Text>
                        <Text style={styles.cardData}>
                            {Number(reduced * 0.2).toFixed(2)}
                        </Text>
                    </View>
                </View>
                <View style={styles.flatListWrapper}>
                    {/**
                    <FlatList
                        contentContainerStyle={styles.scrollerContainer}
                        data={trips}
                        renderItem={this.renderTripRow}
                        // onRefresh={this.snapData}
                        // refreshing={false}
                    />
                    */}
                    
                    <SectionList
                        stickySectionHeadersEnabled
                        // renderItem={this.renderTripDetails}
                        renderItem={this.renderTripRow}
                        renderSectionHeader={({section: {title}}) => (
                            <View style={{backgroundColor:'white',padding : 7}}>
                                <Text style={{fontWeight: 'bold'}}>{title}</Text>
                            </View>
                        )}
                        sections={this.props.sections}
                        keyExtractor={(item, index) => item + index}
                    />
                </View>
            </View>
        );
        /*
        const isCommuter = true;

        if (isCommuter) {
            return (
                <CameraKitCameraScreen 
                    showFrame={true}
                    scanBarcode={true}
                    laserColor={"transparent"}
                    frameColor={"transparent"}
                    onReadCode={((event) => alert(event.nativeEvent.codeStringValue))}
                    hideControls={true}
                    offsetForScannerFrame={30}
                    heightForScannerFrame={300}
                    colorForScannerFrame={'blue'}
                />
            );
        }
        return (
            <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                <QRCode
                    value="SOMETHING SOMETHInG"
                    size={200}
                    bgColor='purple'
                    fgColor='white'/>
            </View>
        );
        */
    }
}


const mapStateToProps = store => {
    return {
        trips: store.trips.trips.filter(trip => trip.Status === 'Travelling' || trip.Status === 'Waiting'),
        sections : [
            {
                title : 'CURRENT & UPCOMING TRIPS',
                data : store.trips.trips.filter(trip => trip.Status === 'Waiting' || trip.Status === 'Travelling'),
            },
            {
                title : 'PREVIOUS TRIPS',
                data : store.trips.trips.filter(trip => trip.Status === 'Finished' || trip.Status === 'Cancelled'),
            }
        ],
        allTrips: store.trips.trips,
    };
}
// const mapStateToProps = store => ({
//     trips: store.trips.trips.filter(booking => booking.Status === 'Travelling' || booking.Status === 'Waiting'),
// });
const mapDispatchToProps = dispatch => ({
    fetchCommuterHistory : () => dispatch(BookingService.fetchCommuterHistory()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);