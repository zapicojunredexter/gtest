import React from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraKitCameraScreen, CameraKitCamera } from 'react-native-camera-kit';
import { throttle, debounce } from 'throttle-debounce';
import TripsService from '../../../services/trips.service';
import BookingsService from '../../../services/bookings.service';
import { checkAndAskPermission } from '../../../utils/permissions';

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    detailsWrapper: {
        height : 100,
    },
    attendanceWrapper: {
        flex : 1,
        backgroundColor : 'orange'
    },
    qrCodeWrapper: {
        flex : 1,
        backgroundColor : 'blue'
    },
    fixedButton: {
        position: 'absolute',
        bottom : 0,
        right : 0,
        backgroundColor : 'green',
        height : 50,
        width : 50,
    },
    listWrapper: {
        flex : 1,
        backgroundColor : 'yellow'
    }
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
    }

    componentDidMount() {
        this.fetchTripData();
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
                    scanBarcode={true}
                    laserColor={"transparent"}
                    frameColor={"transparent"}
                    onReadCode={throttle(5,(event) => alert(event.nativeEvent.codeStringValue))}
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
                <Text>go to list</Text>
            </TouchableOpacity>
        );
    }

    renderSectionList = () => {
        const { selectedTrip } = this.props;
        if(!selectedTrip){ 
            return null;
        }
        const { commuters } = selectedTrip;
        return (
            <View style={styles.listWrapper}>
                <FlatList
                    contentContainerStyle={styles.scrollerContainer}
                    data={commuters}
                    renderItem={this.renderUserRow}
                    onRefresh={this.fetchTripData}
                    refreshing={false}
                />
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
                <Text>go to scanner</Text>
            </TouchableOpacity>
        );
    }

    renderUserRow = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        'TITLE',
                        'BODY',
                        [
                          {
                            text: 'action 1',
                            onPress: () => {},
                          },
                          {
                            text: 'APPROVE',
                            onPress: () => {
                                this.props.approveBooking(item.Id);
                            },
                          },
                          {
                            text: 'CANCEL',
                            onPress: () => {
                                this.props.cancelBooking(item.Id);
                            },
                          },
                        ],
                    );
                }}
            >
                <Text>{JSON.stringify(item)}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        // const { selectedTrip } = this.props.navigation.state.params;
        const { selectedTrip } = this.props;
        const { isQrView }  = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.detailsWrapper}>
                    <Text>attendees{JSON.stringify(selectedTrip)}</Text>
                </View>
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
    fetchFreshTripData : tripId =>  dispatch(TripsService.fetchFreshTripData(tripId)),
    approveBooking : bookingId => dispatch(BookingsService.approveBooking(bookingId)),
    cancelBooking : bookingId => dispatch(BookingsService.cancelBooking(bookingId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);