import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { colors } from '../../../constants/colors';

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

    render() {
        const sampleMarkerLocations = [
            {
                location:{
                    latitude: 10.2997468,
                    longitude: 123.9031766,
                }
            },
            {
                location:{
                    latitude: 10.2997468+0.0003,
                    longitude: 123.9031766+0.0003,
                }
            }
        ];
        const markers = sampleMarkerLocations;
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
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserLocations);
