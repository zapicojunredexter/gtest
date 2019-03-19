import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Image,
    Slider,
    StyleSheet,
    PermissionsAndroid
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { colors } from '../../../constants/colors';
type Props = {
};


const _styles = (userType = 'seculacer') => StyleSheet.create({
    digitPassCodeContainer : {
        marginTop : 70,
        marginLeft : 20,
        marginRight : 20,
        padding : 10,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : colors.fieldSetBg,
    },
    digitPassCodeTitle : {
        color : 'orange',
        fontSize : 20,
    },
    txtFieldCode : {
        textAlign : 'center',
        fontSize : 30,
        height : 100,
        color : 'black',
    },
    mainContainer : {
        flex : 1,
    },
    headerTop : {
        backgroundColor : 'orange',
        height : 130,
    },
    headerComponentsWrapper : {
        flex : 1,
        margin : 30,
        flexDirection : "row"
    },
    edmWrapper : {
        margin : 20,
    },
    edmHeaderTitle : {
        fontSize : 17,
        color : colors.error,
        textAlign : 'center',
    },
    edmTextBox : {
        borderColor : colors.error,
        borderWidth : 1,
        borderRadius : 3,
        backgroundColor : colors.fieldSetBg,
        padding : 5,
        marginTop : 10,
        marginBottom : 10,
        color : 'black',
    },
    edmButton : {
        backgroundColor : colors.responder.mainHeader,
        width : '70%',
        borderRadius : 3,
        alignSelf : 'center',
        padding : 5,
        margin : 10,
    },
    edmButtonTitle : {
        textAlign : 'center',
        color : colors.fontColor,
    },
});

class WhitePane extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['seculacer'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            pinCode : null,
            isMapShown : true,
            isPassCoded : false,
            templateMessage : props.templateMessage,
            currentLocation:{
                // latitude : null,
                // longitude : null,
                latitude: 10.2997468,
                longitude: 123.9031766,
            },
        };
    }

    renderMapBody = () => {
        return (
            <View style={{flex:1, margin : 20 }}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={{
                            ...StyleSheet.absoluteFillObject,
                        }}
                        initialRegion={{
                            latitude: 10.2997468,
                            longitude: 123.9031766,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                        moveOnMarkerPress={false}
                        showsPointsOfInterest={false}
                        followsUserLocation={true}   
                        showsUserLocation       
                    >
                    </MapView>
            </View>
        );
    }

    render() {
        const styles = _styles();
        return (
            <View style={styles.mainContainer}>
            {this.renderMapBody()}
            </View>
        );
    }
}
const mapStateToProps = store => ({
    // user : getUser(store),
    // favContacts : getFavContacts(store),
    // edmPreferred : getEdmPreferred(store),
    // templateMessage : getTemplateMessage(store),
    // currentLocation : getCurrentLocation(store),
});
const mapDispatchToProps = dispatch => ({
    // submitEDM : params => dispatch(WhitePaneService.submitEDM(params)),
    // setUserLocation : params => dispatch(WhitePaneService.setUserLocation(params)),
    // setEDMPreferred : edmPreferred => dispatch(WhitePaneService.setEDMPreferred(edmPreferred)),
    // editTemplate : templateMessage => dispatch(WhitePaneService.editTemplate(templateMessage)),
    // fetchReverseGeocodedAddress : () => dispatch(WhitePaneService.fetchReverseGeocodedAddress()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WhitePane);
