// /*
import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import {View, StyleSheet,Button} from 'react-native';
import {lineString as makeLineString} from '@turf/helpers';
import { CameraKitCameraScreen, CameraKitCamera } from 'react-native-camera-kit';
import RouteSimulator from './RouteSimulator';
import MapboxClient from './MapboxClient';

import PulseCircleLayer from './PulseCircleLayer';

MapboxGL.setAccessToken("pk.eyJ1IjoiemFwaWNvanVucmVkZXh0ZXIiLCJhIjoiY2p0aDlsZHN5MG5xaDN5cDhtbGdrN3hkeSJ9.UOC5ygISBssSgsyXp7rruQ");

const PARIAN_COORDINATES = [123.903557, 10.299158];

const UC_COORDINATES = [123.896886, 10.297485];

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

class DriveTheLine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      route: null,
    //   route:[
    //     [-122.400129,37.788975],
    //     [-122.400129,57.788975],
    //     [-112.400129,87.788975]
    //     ],
    route : null,
      currentPoint: null,
      routeSimulator: null,
    };

    this.onStart = this.onStart.bind(this);
    // setTimeout(() => {this.onStart(); alert(31231);}, 5000);
    // setTimeout()
  }

  onStart() {
    const routeSimulator = new RouteSimulator(this.state.route);
    routeSimulator.addListener(currentPoint => this.setState({currentPoint}));
    routeSimulator.start();
    this.setState({routeSimulator});
  }

  componentDidMount() {
    this.getDirections();
  }

  async getDirections() {
    const res = await MapboxClient.getDirections(
        [
          {
            latitude: PARIAN_COORDINATES[1],
            longitude: PARIAN_COORDINATES[0],
          },
          {
              latitude: UC_COORDINATES[1],
              longitude: UC_COORDINATES[0]
        },
        ],
        {profile: 'walking', geometry: 'polyline'},
      );
      console.log("HOOOOY",res);
    this.setState({
      route: makeLineString(res.entity.routes[0].geometry.coordinates),
    });
  }

  componentWillUnmount() {
    // if (this.state.routeSimulator) {
    //   this.state.routeSimulator.stop();
    // }
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
    console.log("HAHA", this.state.currentPoint);
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
    let backgroundColor = 'yellow';

    if (this.state.currentPoint) {
      backgroundColor = '#314ccd';
    }

    const style = [layerStyles.origin, {circleColor: backgroundColor}];

    return (
      <MapboxGL.ShapeSource
        id="origin"
        shape={MapboxGL.geoUtils.makePoint(PARIAN_COORDINATES)}
      >
        <MapboxGL.Animated.CircleLayer id="originInnerCircle" style={style} />
      </MapboxGL.ShapeSource>
    );
  }

  /*
  render() {
    return (
        <MapboxGL.MapView
          zoomLevel={13}
          ref={c => (this._map = c)}
          centerCoordinate={PARIAN_COORDINATES}
          style={{flex : 1, margin : 30}}
          showUserLocation
        //   styleURL={MapboxGL.StyleURL.Dark}
        >
          {this.renderOrigin()}

          {this.renderRoute()}
          {this.renderCurrentPoint()}
          {this.renderProgressLine()}

          <MapboxGL.ShapeSource
            id="destination"
            shape={MapboxGL.geoUtils.makePoint(UC_COORDINATES)}
          >
            <MapboxGL.CircleLayer
              id="destinationInnerCircle"
              style={layerStyles.destination}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
    );
  }
  */
 render(){
     return (
        <CameraKitCameraScreen
        
        showFrame={true}
        scanBarcode={true}
        laserColor={"blue"}
        frameColor={"yellow"}
        onReadCode={((event) => alert(event.nativeEvent.codeStringValue))}
        hideControls={true}
        offsetForScannerFrame={30}
        heightForScannerFrame={300}
        colorForScannerFrame={'blue'}
      />
     );
     return (
    <CameraKitCameraScreen
        actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
        // onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
        scanBarcode={true}
        laserColor={"blue"}
        frameColor={"yellow"}

        onReadQRCode={((event) => Alert.alert("Qr code found"))} //optional
        hideControls={false}           //(default false) optional, hide buttons and additional controls on top and bottom of screen
        showFrame={true}   //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
        offsetForScannerFrame = {10}   //(default 30) optional, offset from left and right side of the screen
        heightForScannerFrame = {300}  //(default 200) optional, change height of the scanner frame
        colorForScannerFrame = {'red'} //(default white) optional, change colot of the scanner frame
    />
     );
 }
}

export default DriveTheLine;