import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { CameraKitCameraScreen, CameraKitCamera } from 'react-native-camera-kit';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        padding : 5,
    },
    flatListWrapper : {
        flex : 1,
        padding : 10,
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
    }
});
class Container extends React.PureComponent<> {
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
                {renderTripRecord('Trip Date',item.TripDate)}
                {renderTripRecord('Plate Number',item.VehiclePlateNo)}
                {renderTripRecord('Commuter Count', `${item.CommutersCount} / ${item.CommutersTotal}`)}
                {renderTripRecord('Departure Time', `${item.Schedule}`)}
                {renderTripRecord('Status',item.Status)}
            </TouchableOpacity>
        );
    }

    render() {
        const { trips } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.flatListWrapper}>
                    <FlatList
                        contentContainerStyle={styles.scrollerContainer}
                        data={trips}
                        renderItem={this.renderTripRow}
                        // onRefresh={this.snapData}
                        // refreshing={false}
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

const mapStateToProps = store => ({
    trips: store.trips.trips.filter(booking => booking.Status !== 'Finished'),
});
const mapDispatchToProps = dispatch => ({
    fetchCommuterHistory : () => dispatch(BookingService.fetchCommuterHistory()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);