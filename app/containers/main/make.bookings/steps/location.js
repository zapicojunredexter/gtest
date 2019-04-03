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
            from : null,
            to : null,
            route : null,
        }
    }

    async getDirections() {
        const { locations } = this.props;
        const {
            from,
            to
        } = this.state;
        const res = await MapboxClient.getDirections(
            [
            {
                latitude: from.Coordinates[1],
                longitude: from.Coordinates[0],
            },
            {
                latitude: to.Coordinates[1],
                longitude: to.Coordinates[0]
            },
            ],
            {profile: 'walking', geometry: 'polyline'},
        );
        this.setState({
            route: makeLineString(res.entity.routes[0].geometry.coordinates),
        });
    }

    selectFrom = (from) => {
        const { locations } = this.props;
        const selectedLocation = locations.find(location => location.TerminalAddress === from);

        if(selectedLocation){
            this.setState({from : selectedLocation, to : null});
            this.flyToLocation(selectedLocation.Coordinates);
        } else {
            alert("Location does not exist");
        }
    }

    selectTo = (to) => {
        const { locations } = this.props;
        const selectedLocation = locations.find(location => location.TerminalAddress === to);
        
        if(selectedLocation){
            this.setState({to : selectedLocation});
            this.flyToLocation(selectedLocation.Coordinates);
            this.getDirections();
        } else {
            alert("Location does not exist");
        }
    }

    flyToLocation = coordinates => {
        if(coordinates && coordinates.length === 2){
            this._map.flyTo(coordinates,3000)
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
        // const selectedFromLocation = locations.find(location => location.TerminalAddress === from);
        const toChoices = from ? locations.filter(location => from.dropoffPoints.includes(location.TerminalAddress)) : [];
        // const selectedToLocation = toChoices.length > 0 ? : null;
        return (
            <View style={{flex:1}}>
                <Text>IN LOCATION</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex: 1}}>FROM</Text>
                    <Picker
                        style={{flex:1}}
                        numberOfLines={1}
                        choices={fromChoices.map(location => location.TerminalAddress)}
                        selectedValue={from && from.TerminalAddress}
                        onSelect={this.selectFrom}
                    />
                    <Text style={{flex: 1}}>TO</Text>
                    <Picker
                        style={{flex:1}}
                        numberOfLines={1}
                        choices={toChoices.map(location => location.TerminalAddress)}
                        selectedValue={to && to.TerminalAddress}
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
            TerminalAddress : 'CAPITOL',
            Coordinates : [123.8907, 10.3168],
            dropoffPoints : ['FORT SAN PEDRO','CEBU BUSINESS PARK'],
        },
        {
            id : 'FORT SAN PEDRO',
            TerminalAddress : 'FORT SAN PEDRO',
            Coordinates : [123.9056,10.2925],
            dropoffPoints : ['CAPITOL','CEBU BUSINESS PARK'],
        },
        {
            id : 'CEBU BUSINESS PARK',
            TerminalAddress : 'CEBU BUSINESS PARK',
            Coordinates : [123.9060,10.3174],
            dropoffPoints : ['CAPITOL','FORT SAN PEDRO'],
        },
    ],
}

export default Container;