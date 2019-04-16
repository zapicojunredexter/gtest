import React from 'react';
import { connect } from 'react-redux';
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraKitCameraScreen, CameraKitCamera } from 'react-native-camera-kit';

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

    subscribeTrip;

    attendees;

    state = {
        isQrView: false,
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    renderQrScanner = () => {
        return (
            <View style={styles.qrCodeWrapper}>
                <CameraKitCameraScreen 
                    // showFrame={true}
                    scanBarcode={true}
                    laserColor={"transparent"}
                    frameColor={"transparent"}
                    onReadCode={((event) => alert(event.nativeEvent.codeStringValue))}
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
        return (
            <View style={styles.listWrapper}>
                <Text>THIS SHOULD BE LIST</Text>
            </View>
        );
    }

    renderScannerButton = () => {
        return (
            <TouchableOpacity
                style={styles.fixedButton}
                onPress={() => {
                    this.setState({isQrView : true})
                }}
            >
                <Text>go to scanner</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const { trip } = this.props.navigation.state.params;
        const { isQrView }  = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.detailsWrapper}>
                    <Text>attendees{JSON.stringify(trip)}</Text>
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
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);