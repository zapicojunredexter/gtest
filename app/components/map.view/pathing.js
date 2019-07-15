// /*
import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import {View, StyleSheet,Button} from 'react-native';
import {lineString as makeLineString} from '@turf/helpers';
import RouteSimulator from '../map.view/RouteSimulator';;
import MapboxClient from '../../utils/mapbox.client';

import PulseCircleLayer from '../map.view/PulseCircleLayer';

MapboxGL.setAccessToken("pk.eyJ1IjoiemFwaWNvanVucmVkZXh0ZXIiLCJhIjoiY2p0aDlsZHN5MG5xaDN5cDhtbGdrN3hkeSJ9.UOC5ygISBssSgsyXp7rruQ");

const CAPITOL_COORDINATES = [123.8907, 10.3168];

const PARIAN_COORDINATES = [123.903557, 10.299158];

const UC_COORDINATES = [123.896886, 10.297485];

const layerStyles = MapboxGL.StyleSheet.create({
  origin: {
    circleRadius: 5,
    circleColor: 'green',
  },
  destination: {
    circleRadius: 5,
    circleColor: '#336699',
  },
  route: {
    lineColor: 'grey',
    lineWidth: 3,
    lineOpacity: 0.84,
  },
  progress: {
    lineColor: '#314ccd',
    lineWidth: 3,
  },
});

class DriveTheLine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            route: null,
            route : null,
            currentPoint: null,
            routeSimulator: null,
        };

        this.onStart = this.onStart.bind(this);
        // setTimeout(() => {this.onStart(); alert(31231);}, 5000);
    }

    onStart() {
        const routeSimulator = new RouteSimulator(this.state.route);
        routeSimulator.addListener(currentPoint => this.setState({currentPoint}));
        routeSimulator.start();
        this.setState({routeSimulator});
    }

    componentDidMount() {
        setTimeout(() => {
            this.getDirections().catch(error => alert(error.message));
        }, 3000);
    }

    async getDirections() {
        const res = await MapboxClient.getDirections(
            [
                // {
                //     latitude: PARIAN_COORDINATES[1],
                //     longitude: PARIAN_COORDINATES[0],
                // },
                // {
                //     latitude: UC_COORDINATES[1],
                //     longitude: UC_COORDINATES[0]
                // },
            {
                latitude: this.props.route.FromLocation[1],
                longitude: this.props.route.FromLocation[0],
            },
            {
                latitude: this.props.route.ToLocation[1],
                longitude: this.props.route.ToLocation[0]
            },
            ],
            {profile: 'walking', geometry: 'polyline'},
        );
        this.setState({
            route: makeLineString(res.entity.routes[0].geometry.coordinates),
        });
    }

    componentWillUnmount() {
        if (this.state.routeSimulator) {
          this.state.routeSimulator.stop();
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

    renderCurrentPoint() {
        if (!this.state.currentPoint) {
            return;
        }
        return (
            <PulseCircleLayer
                shape={this.state.currentPoint}
                aboveLayerID="destinationInnerCircle"
            />
        );
    }

    renderProgressLine() {
        if (!this.state.currentPoint) {
            return null;
        }

        const {nearestIndex} = this.state.currentPoint.properties;
        const coords = this.state.route.geometry.coordinates.filter(
            (c, i) => i <= nearestIndex,
        );
        coords.push(this.state.currentPoint.geometry.coordinates);

        if (coords.length < 2) {
            return null;
        }

        const lineString = makeLineString(coords);
        return (
            <MapboxGL.Animated.ShapeSource id="progressSource" shape={lineString}>
                <MapboxGL.Animated.LineLayer
                    id="progressFill"
                    style={layerStyles.progress}
                    aboveLayerID="routeFill"
                />
            </MapboxGL.Animated.ShapeSource>
        );
    }

    renderOrigin() {
        let backgroundColor = '#336699';

        if (this.state.currentPoint) {
            backgroundColor = '#314ccd';
        }

        const style = [layerStyles.origin, {circleColor: backgroundColor}];

        return (
            <MapboxGL.ShapeSource
                id="origin"
                shape={MapboxGL.geoUtils.makePoint(this.props.route.FromLocation)}
            >
                <MapboxGL.Animated.CircleLayer id="originInnerCircle" style={style} />
            </MapboxGL.ShapeSource>
        );
    }

    render() {
        return (
            <MapboxGL.MapView
                zoomLevel={13}
                ref={c => (this._map = c)}
                centerCoordinate={PARIAN_COORDINATES}
                centerCoordinate={this.props.FromLocation || CAPITOL_COORDINATES}
                style={{flex : 1, margin : 10}}
                // this is not same as the one in global state
                showUserLocation
                //   styleURL={MapboxGL.StyleURL.Dark}
            >
                {this.renderOrigin()}

                {this.renderRoute()}
                {this.renderCurrentPoint()}
                {this.renderProgressLine()}

                <MapboxGL.ShapeSource
                    id="destination"
                    shape={MapboxGL.geoUtils.makePoint(this.props.route.ToLocation)}
                >
                    <MapboxGL.CircleLayer
                    id="destinationInnerCircle"
                    style={layerStyles.destination}
                    />
                </MapboxGL.ShapeSource>
                {/**/}
                
            </MapboxGL.MapView>
        );
    }
}

export default DriveTheLine;