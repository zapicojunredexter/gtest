import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { colors } from '../../../constants/colors';
import { getLocations } from '../../../selectors/responder.locations.selector';
import ResponderLocationsService from '../../../services/responder.locations.service';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

type Props = {
};


class UserLocations extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['responder'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
    }
    constructor(props){
        super(props);
        const { fetchSeculacersLocation } = props;
        fetchSeculacersLocation();
    }

    render() {
        const markers = this.props.seculacers;
        console.log('HEEEY', markers);
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
                    showsUserLocation
                    showsPointsOfInterest={false}
                    followsUserLocation={true}   
                    showsUserLocation       
                >
                {markers.map((marker) => {
                    return (
                        <Marker.Animated
                            coordinate={marker.location}
                            title={"title"}
                            description={"descr"}
                            identifier={"123"}
                            key={"123"}
                        />
                    );
                })}
                </MapView>
            </View>
        );
    }
}
const mapStateToProps = store => ({
    seculacers : getLocations(store),
});
const mapDispatchToProps = dispatch => ({
    fetchSeculacersLocation : () => dispatch(ResponderLocationsService.fetchLocations()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLocations);
