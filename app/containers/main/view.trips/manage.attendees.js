import React from 'react';
import { connect } from 'react-redux';
import { View, Text, SectionList, Button, ToastAndroid, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Text as OpenText } from 'react-native-openanything';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { CameraKitCameraScreen, CameraKitCamera } from 'react-native-camera-kit';
import { throttle, debounce } from 'throttle-debounce';
import TripsService from '../../../services/trips.service';
import BookingsService from '../../../services/bookings.service';
import { checkAndAskPermission } from '../../../utils/permissions';
import SystemRestricted from '../../../utils/system.restrction';
import ConfirmAttendeeQr from './confirm.attendee.qr';

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    detailsWrapper: {
        height : 100,
    },
    attendanceWrapper: {
        flex : 1,
    },
    qrCodeWrapper: {
        flex : 1,
    },
    fixedButton: {
        position: 'absolute',
        bottom : 0,
        right : 0,
        backgroundColor : 'green',
        height : 70,
        width : 70,
        borderRadius: 70 / 2,
        backgroundColor: '#0B5173',
        opacity: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        marginRight: 5,
    },
    listWrapper: {
        flex : 1,
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
});

class Container extends React.PureComponent<> {
   static navigationOptions = (({ navigation, screenProps }) => ({
        headerLeft : (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>back</Text>
            </TouchableOpacity>
        ),
        title : "MANAGE ATTENDEES",
    }));

    state = {
        isQrView: false,
        detectedBooking: null,
    }

    componentDidMount() {
        this.fetchTripData();
    }

    confirmCommuterAttendance = (id) => {
        this.props.approveBooking(id).then(() => {
            this.setState({detectedBooking: null});
            ToastAndroid.show("Approved Booking",ToastAndroid.SHORT);
            this.fetchTripData();
        }).catch(error => alert(error.message));
    }

    fetchTripData = () => {
        const { trip } = this.props.navigation.state.params;
        const { fetchFreshTripData } = this.props;
        fetchFreshTripData(trip.Id);
    }

    renderQrScanner = () => {
        return (
            <View style={styles.qrCodeWrapper}>
                <CameraKitCameraScreen 
                    // showFrame={true}
                    scanBarcode={!this.state.detectedBooking}
                    laserColor={"transparent"}
                    frameColor={"transparent"}
                    onReadCode={(event) => {
                        // alert('MISULOD');
                        // if(!event.nativeEvent && !event.nativeEvent.codeStringValue) {
                        //     return;
                        // }
                        console.log('Naai nadetect ay', event.nativeEvent.codeStringValue);

                        const { selectedTrip } = this.props;
                        if(!selectedTrip){ 
                            return;
                        }
                        const { Bookings } = selectedTrip;
                        const foundBooking = Bookings.find(booking => booking.Id === event.nativeEvent.codeStringValue);
                        this.setState({detectedBooking: foundBooking});
                        // alert(event.nativeEvent.codeStringValue);
                    }}
                    hideControls={true}
                    offsetForScannerFrame={30}
                    heightForScannerFrame={300}
                    colorForScannerFrame={'blue'}
                />
            </View>
        );
    }

    renderListButton = () => {
        return (
            <TouchableOpacity
                style={styles.fixedButton}
                onPress={() => {
                    this.setState({isQrView : false})
                }}
            >
                <FontAwesome name="list" size={25} color="#fff" />
            </TouchableOpacity>
        );
    }

    mapUsers = () => {
        const { selectedTrip } = this.props;
        if(!selectedTrip){ 
            return [];
        }
        const { Bookings } = selectedTrip;
        return [
            {
                title: 'UNCHECKED',
                data: Bookings.filter(booking => booking.Status === 'Waiting'),
            },
            {
                title: 'STANDBY',
                data: Bookings.filter(booking => booking.Status === 'Travelling'),
            },
            {
                title: 'CANCELLED',
                data: Bookings.filter(booking => booking.Status === 'Cancelled'),
            }
        ];
    }

    renderSectionList = () => {
        const { selectedTrip } = this.props;
        if(!selectedTrip){ 
            return null;
        }
        const { Bookings } = selectedTrip;
        return (
            <View style={styles.listWrapper}>
                <SectionList
                    stickySectionHeadersEnabled
                    // renderItem={() => <Text>sdasdads</Text>}
                    renderItem={this.renderUserRow}
                    renderSectionHeader={({section: {title}}) => (
                        <View style={{backgroundColor:'white',padding : 7}}>
                            <Text style={{fontWeight: 'bold'}}>{title}</Text>
                        </View>
                    )}
                    sections={this.mapUsers()}
                    keyExtractor={(item, index) => item + index}
                />
                {/*
                <FlatList
                    contentContainerStyle={styles.scrollerContainer}
                    data={Bookings}
                    renderItem={this.renderUserRow}
                    onRefresh={this.fetchTripData}
                    refreshing={false}
                />
                */}
            </View>
        );
    }

    renderScannerButton = () => {
        return (
            <TouchableOpacity
                style={styles.fixedButton}
                onPress={() => {
                    checkAndAskPermission(
                        'camera',
                        () => this.setState({isQrView : true}),
                        {
                            alertTitle : ``,
                            alertMessage : `GT.Est needs access to your phone's camera`,
                        }
                    );
                    
                }}
            >
                <FontAwesome name="qrcode" size={25} color="#fff" />
            </TouchableOpacity>
        );
    }

    renderUserRow = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        `${item.Commuter && `${item.Commuter.FirstName} ${item.Commuter.LastName}`}`,
                        `${item.Commuter && item.Commuter.ContactNumber}`,
                        [
                          {
                            text: 'SEND SMS',
                            onPress: () => OpenText(item.Commuter && item.Commuter.ContactNumber, ''),
                          },
                          {
                            text: 'APPROVE',
                            onPress: () => {
                                this.confirmCommuterAttendance(item.Id);
                            },
                          },
                          {
                            text: 'CANCEL',
                            onPress: () => {
                                // this.props.cancelBooking(item.Id).then(() => {
                                //     ToastAndroid.show("Cancelled Booking",ToastAndroid.SHORT);
                                //     this.fetchTripData();
                                // }).catch(error => alert(error.message));
                            },
                          },
                        ],
                    );
                }}
                style={{
                    flexDirection: 'row',
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                }}
            >
                <FontAwesome
                    name={item.Commuter && item.Commuter.Gender === 'female' ? 'female' : 'male'}
                    size={15}
                    color="#000"
                    style={{ marginRight: 5 }}
                />
                <Text>{`${item.Commuter && `${item.Commuter.FirstName} ${item.Commuter.LastName}`}`}</Text>
            </TouchableOpacity>
        );
    }


    renderTripDetails = () => {
        const { selectedTrip } = this.props;
        const item = selectedTrip;
        const isTravelling = item && item.Status === "Travelling";
        const isCancelled = item && item.Status === "Cancelled";
        const renderTripRecord = (label, value) => (
            <View style={styles.tripRowComponentPair}>
                <Text style={styles.tripRowComponentPairLabel}>{label || '-'}</Text>
                <Text style={styles.tripRowComponentPairValue}>{value || '-'}</Text>
            </View>
        );
        return (
            <TouchableOpacity
                onPress={this.fetchTripData}
                style={[
                    styles.tripRowContainer,
                    isTravelling && styles.tripRowTravelling,
                    isCancelled && styles.tripRowCancelled
                ]}
            >
                {renderTripRecord('Driver Name',item && item.Driver && `${item.Driver.FirstName} ${item.Driver.LastName}`)}
                {renderTripRecord('Vehicle Number',item && item.Vehicle && `${item.Vehicle.PlateNumber}`)}
                {renderTripRecord('Route',item && item.Route && item.Route.Route)}
                {renderTripRecord('Departure Date',item && item.Schedule && item.Schedule.DepartDate)}
                {renderTripRecord('Departure Time',item && item.Schedule && item.Schedule.DepartTime)}
            </TouchableOpacity>
        );
    }

    render() {
        // const { selectedTrip } = this.props.navigation.state.params;
        const { selectedTrip } = this.props;
        const item = selectedTrip;
        const isTravelling = item && item.Status === "Travelling";
        const { isQrView }  = this.state;
        return (
            <View style={styles.container}>
                <ConfirmAttendeeQr
                    modalProps={{
                        isVisible: !!this.state.detectedBooking,
                        onBackdropPress : () => this.setState({detectedBooking : null})
                    }}
                    bookingDetails={this.state.detectedBooking}
                    onConfirm={this.confirmCommuterAttendance}
                />
                {this.renderTripDetails()}
                <Button
                    title={`${isTravelling ? `FINISH TRIP` : `START TRIP`}`}
                    onPress={() => {
                        if(isTravelling){
                            this.props.finishTrip(item.Id).then(() => {
                                this.fetchTripData();
                            } );
                        }else{
                            this.props.startTrip(item.Id).then(() => {
                                this.fetchTripData();
                            } );
                        }
                    }}
                />
                <View style={styles.attendanceWrapper}>
                    {isQrView ? this.renderQrScanner() : this.renderSectionList()}
                    
                    {isQrView ? this.renderListButton() : this.renderScannerButton()}
                </View>
            </View>
        );
    }
}

const mapStateToProps = store => ({
    selectedTrip: store.trips.selectedDriverTrip
});
const mapDispatchToProps = dispatch => ({
    startTrip: tripId => dispatch(TripsService.startTrip(tripId)),
    finishTrip: tripId => dispatch(TripsService.finishTrip(tripId)),
    fetchFreshTripData : tripId =>  dispatch(TripsService.fetchFreshTripData(tripId)),
    approveBooking : bookingId => dispatch(BookingsService.approveBooking(bookingId)),
    cancelBooking : bookingId => dispatch(BookingsService.cancelBooking(bookingId)),
});

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(Container);
export default SystemRestricted(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container),
{
    disableCheckLocation : true,
});