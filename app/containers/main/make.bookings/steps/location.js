import React from 'react';
import { View, Text, Button } from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import {lineString as makeLineString} from '@turf/helpers';
import Picker from '../../../../components/picker';
import MapboxClient from '../../../../utils/mapbox.client';

MapboxGL.setAccessToken("pk.eyJ1IjoiemFwaWNvanVucmVkZXh0ZXIiLCJhIjoiY2p0aDlsZHN5MG5xaDN5cDhtbGdrN3hkeSJ9.UOC5ygISBssSgsyXp7rruQ");
// capitol cebu
const DEFAULT_COORDINATES = [123.8907, 10.3168];

const layerStyles = MapboxGL.StyleSheet.create({
    origin: {
      circleRadius: 5,
      circleColor: 'green',
    },
    destination: {
      circleRadius: 5,
      circleColor: 'blue',
    },
    route: {
      lineColor: 'orange',
      lineWidth: 3,
      lineOpacity: 0.84,
    },
    progress: {
      lineColor: '#314ccd',
      lineWidth: 3,
    },
});

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
        this.state = {
            from : '',
            to : '',
            route : null,
        }
    }

    async getDirections() {
        const { locations } = this.props;
        const {
            from,
            to
        } = this.state;
        const fromLocation = locations.find(location => location.pickupPoint === from);
        const toLocation = locations.find(location => location.pickupPoint === to);
        console.log('ARANG LOCS',fromLocation,toLocation)
        const res = await MapboxClient.getDirections(
            [
            {
                latitude: fromLocation.coordinates[1],
                longitude: fromLocation.coordinates[0],
            },
            {
                latitude: toLocation.coordinates[1],
                longitude: toLocation.coordinates[0]
            },
            ],
            {profile: 'walking', geometry: 'polyline'},
        );
        console.log("ARANG RES", res);
        this.setState({
            route: makeLineString(res.entity.routes[0].geometry.coordinates),
        });
    }

    selectFrom = (from) => {
        this.setState({from, to : ''});
        this.flyToLocation(from);
    }

    selectTo = (to) => {
        this.setState({to});
        this.flyToLocation(to);
        this.getDirections();
    }

    flyToLocation = flyToLocation => {
        const { locations } = this.props;
        const selectedLocation = locations.find(location => location.pickupPoint === flyToLocation);
        if(selectedLocation && selectedLocation.pickupPoint){
            this._map.flyTo(selectedLocation.coordinates,3000)
        }
    }

    renderRoute() {
        if (!this.state.route) {
            return null;
        }

        return (
        <MapboxGL.ShapeSource id="routeSource" shape={this.state.route}>
            <MapboxGL.LineLayer
            id="routeFill"
            style={layerStyles.route}
            belowLayerID="originInnerCircle"
            />
        </MapboxGL.ShapeSource>
        );
    }

    render() {
        const { goToNext, locations } = this.props;
        const {
            from,
            to
        } = this.state;
        const fromChoices = locations;
        const selectedLocation = locations.find(location => location.pickupPoint === from);
        const toChoices = selectedLocation ? locations.filter(location => selectedLocation.dropoffPoints.includes(location.pickupPoint)) : [];

        return (
            <View style={{flex:1}}>
                <Text>IN LOCATION</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex: 1}}>FROM</Text>
                    <Picker
                        style={{flex:1}}
                        numberOfLines={1}
                        choices={fromChoices.map(location => location.pickupPoint)}
                        selectedValue={from}
                        onSelect={this.selectFrom}
                    />
                    <Text style={{flex: 1}}>TO</Text>
                    <Picker
                        style={{flex:1}}
                        numberOfLines={1}
                        choices={toChoices.map(location => location.pickupPoint)}
                        selectedValue={to}
                        onSelect={this.selectTo}
                    />
                </View>
                <MapboxGL.MapView
                    zoomLevel={13}
                    zoomLevel={17}
                    ref={c => (this._map = c)}
                    style={{flex : 1, margin : 10}}
                    showUserLocation
                    centerCoordinate={DEFAULT_COORDINATES}
                >
                    {this.renderRoute()}
                </MapboxGL.MapView>
                <Button
                    title="NEXT"
                    onPress={goToNext}
                />
            </View>
        );
    }
}

Container.defaultProps = {
    locations : [
        {
            id : 'CAPITOL',
            pickupPoint : 'CAPITOL',
            coordinates : DEFAULT_COORDINATES,
            dropoffPoints : ['FORT SAN PEDRO','CEBU BUSINESS PARK'],
        },
        {
            id : 'FORT SAN PEDRO',
            pickupPoint : 'FORT SAN PEDRO',
            coordinates : [123.9056,10.2925],
            dropoffPoints : ['CAPITOL','CEBU BUSINESS PARK'],
        },
        {
            id : 'CEBU BUSINESS PARK',
            pickupPoint : 'CEBU BUSINESS PARK',
            coordinates : [123.9060,10.3174],
            dropoffPoints : ['CAPITOL','FORT SAN PEDRO'],
        },

    ],
}

export default Container;