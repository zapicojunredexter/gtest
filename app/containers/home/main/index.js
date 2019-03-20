/* import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import {View, StyleSheet} from 'react-native';
import {lineString as makeLineString} from '@turf/helpers';

// import RouteSimulator from '../utils/RouteSimulator';
// import MapboxClient from './MapboxClient';
// import {SF_OFFICE_COORDINATE} from '../utils';

// import PulseCircleLayer from './common/PulseCircleLayer';

MapboxGL.setAccessToken("pk.eyJ1IjoiemFwaWNvanVucmVkZXh0ZXIiLCJhIjoiY2p0aDlsZHN5MG5xaDN5cDhtbGdrN3hkeSJ9.UOC5ygISBssSgsyXp7rruQ");

const SF_OFFICE_COORDINATE = [-122.400021, 37.789085];

const SF_ZOO_COORDINATE = [-122.505412, 37.737463];

const styles = StyleSheet.create({
  buttonCnt: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  button: {
    borderRadius: 3,
    backgroundColor: 'blue',
  },
});

const layerStyles = MapboxGL.StyleSheet.create({
  origin: {
    circleRadius: 5,
    circleColor: 'white',
  },
  destination: {
    circleRadius: 5,
    circleColor: 'white',
  },
  route: {
    lineColor: 'white',
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
      currentPoint: null,
      routeSimulator: null,
    };

    this.onStart = this.onStart.bind(this);
  }

  onStart() {
    // const routeSimulator = new RouteSimulator(this.state.route);
    // routeSimulator.addListener(currentPoint => this.setState({currentPoint}));
    // routeSimulator.start();
    // this.setState({routeSimulator});
  }

  componentDidMount() {
    // this.getDirections();
  }

  async getDirections() {
    const res = await MapboxClient.getDirections(
      [
        {
          latitude: SF_OFFICE_COORDINATE[1],
          longitude: SF_OFFICE_COORDINATE[0],
        },
        {latitude: SF_ZOO_COORDINATE[1], longitude: SF_ZOO_COORDINATE[0]},
      ],
      {profile: 'walking', geometry: 'polyline'},
    );

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
      <MapboxGL.ShapeSource id="routeSource" shape={route}>
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
    return null;
    // return (
    //   <PulseCircleLayer
    //     shape={this.state.currentPoint}
    //     aboveLayerID="destinationInnerCircle"
    //   />
    // );
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
    let backgroundColor = 'white';

    if (this.state.currentPoint) {
      backgroundColor = '#314ccd';
    }

    const style = [layerStyles.origin, {circleColor: backgroundColor}];

    return (
      <MapboxGL.ShapeSource
        id="origin"
        shape={MapboxGL.geoUtils.makePoint(SF_OFFICE_COORDINATE)}
      >
        <MapboxGL.Animated.CircleLayer id="originInnerCircle" style={style} />
      </MapboxGL.ShapeSource>
    );
  }

  render() {
    return (
        <MapboxGL.MapView
          zoomLevel={11}
          ref={c => (this._map = c)}
          centerCoordinate={[-122.452652, 37.762963]}
          style={{flex : 1}}
          styleURL={MapboxGL.StyleURL.Dark}
        >
          {this.renderOrigin()}

          {this.renderRoute()}
          {this.renderCurrentPoint()}
          {this.renderProgressLine()}

          <MapboxGL.ShapeSource
            id="destination"
            shape={MapboxGL.geoUtils.makePoint(SF_ZOO_COORDINATE)}
          >
            <MapboxGL.CircleLayer
              id="destinationInnerCircle"
              style={layerStyles.destination}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
    );
  }
}

export default DriveTheLine;
*/
/*
import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken("pk.eyJ1IjoiemFwaWNvanVucmVkZXh0ZXIiLCJhIjoiY2p0aDlsZHN5MG5xaDN5cDhtbGdrN3hkeSJ9.UOC5ygISBssSgsyXp7rruQ");


const styles = MapboxGL.StyleSheet.create({
  boxFill: {
    fillColor: MapboxGL.StyleSheet.source(
      [[0, '#33669905'], [1, 'blue']],
      'box',
      MapboxGL.InterpolationMode.Categorial,
    ),
    fillAntialias: true,
  },
});

const VECTOR_SOURCE_URL =
  'mapbox://nickitaliano.cj94go8xl18fl2qp92v8bdivv-4kgl9';

class CustomVectorSource extends React.PureComponent {

  render() {
    return (
        <MapboxGL.MapView
          zoomLevel={2}
          centerCoordinate={[-101.051593, 41.370337]}
          style={{flex : 1}}
        >
          <MapboxGL.VectorSource
            id="customSourceExample"
            url={VECTOR_SOURCE_URL}
          >
            <MapboxGL.FillLayer
              id="customSourceFill"
              sourceLayerID="react-native-example"
              style={styles.boxFill}
            />
            <MapboxGL.LineLayer
            id="routeFill"
            style={{
                lineColor: 'white',
                lineWidth: 3,
                lineOpacity: 0.84,
              }}
            belowLayerID="originInnerCircle"
            />
          </MapboxGL.VectorSource>
        </MapboxGL.MapView>
    );
  }
}

export default CustomVectorSource;
*/
/*
import React from 'react';
import {Animated, View, Text, StyleSheet} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken("pk.eyJ1IjoiemFwaWNvanVucmVkZXh0ZXIiLCJhIjoiY2p0aDlsZHN5MG5xaDN5cDhtbGdrN3hkeSJ9.UOC5ygISBssSgsyXp7rruQ");

const ANNOTATION_SIZE = 45;

const styles = StyleSheet.create({
  annotationContainer: {
    width: ANNOTATION_SIZE,
    height: ANNOTATION_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: ANNOTATION_SIZE / 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, 0.45)',
  },
  annotationFill: {
    width: ANNOTATION_SIZE - 3,
    height: ANNOTATION_SIZE - 3,
    borderRadius: (ANNOTATION_SIZE - 3) / 2,
    backgroundColor: 'orange',
    transform: [{scale: 0.6}],
  },
});

class ShowPointAnnotation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeAnnotationIndex: -1,
      previousActiveAnnotationIndex: -1,

      backgroundColor: 'blue',
      coordinates: [[-73.99155, 40.73581]],
    };

    this._scaleIn = null;
    this._scaleOut = null;

    this.onPress = this.onPress.bind(this);
  }

  onPress(feature) {
    const coords = Object.assign([], this.state.coordinates);
    coords.push(feature.geometry.coordinates);
    this.setState({coordinates: coords});
    console.log("CLICKED",feature);
  }

  onAnnotationSelected(activeIndex, feature) {
    if (this.state.activeIndex === activeIndex) {
      return;
    }

    this._scaleIn = new Animated.Value(0.6);
    Animated.timing(this._scaleIn, {toValue: 1.0, duration: 200}).start();
    this.setState({activeAnnotationIndex: activeIndex});

    if (this.state.previousActiveAnnotationIndex !== -1) {
      this._map.moveTo(feature.geometry.coordinates, 500);
    }
  }

  onAnnotationDeselected(deselectedIndex) {
    const nextState = {};

    if (this.state.activeAnnotationIndex === deselectedIndex) {
      nextState.activeAnnotationIndex = -1;
    }

    this._scaleOut = new Animated.Value(1);
    Animated.timing(this._scaleOut, {toValue: 0.6, duration: 200}).start();
    nextState.previousActiveAnnotationIndex = deselectedIndex;
    this.setState(nextState);
  }

  renderAnnotations() {
    const items = [];

    for (let i = 0; i < this.state.coordinates.length; i++) {
      const coordinate = this.state.coordinates[i];
      const title = `Longitude: ${this.state.coordinates[i][0]} Latitude: ${
        this.state.coordinates[i][1]
      }`;
      const id = `pointAnnotation${i}`;

      const animationStyle = {};
      if (i === this.state.activeAnnotationIndex) {
        animationStyle.transform = [{scale: this._scaleIn}];
      } else if (i === this.state.previousActiveAnnotationIndex) {
        animationStyle.transform = [{scale: this._scaleOut}];
      }

      items.push(
        <MapboxGL.PointAnnotation
          key={id}
          id={id}
          title="Test"
          selected={i === 0}
          onSelected={feature => this.onAnnotationSelected(i, feature)}
          onDeselected={() => this.onAnnotationDeselected(i)}
          coordinate={coordinate}
        >
          <View style={styles.annotationContainer}>
            <Animated.View style={[styles.annotationFill, animationStyle]} />
          </View>

          <MapboxGL.Callout title={title} />
        </MapboxGL.PointAnnotation>,
      );
    }

    return items;
  }

  render() {
    return (
        <MapboxGL.MapView
          ref={c => (this._map = c)}
          zoomLevel={16}
          onPress={this.onPress}
          onDidFinishLoadingMap={this.onDidFinishLoadingMap}
          centerCoordinate={this.state.coordinates[0]}
          style={{flex : 1}}
        >
          {this.renderAnnotations()}
        </MapboxGL.MapView>
    );
  }
}

export default ShowPointAnnotation;
*/
///*
import React, {Component} from 'react';
import {View} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

MapboxGL.setAccessToken("pk.eyJ1IjoiemFwaWNvanVucmVkZXh0ZXIiLCJhIjoiY2p0aDlsZHN5MG5xaDN5cDhtbGdrN3hkeSJ9.UOC5ygISBssSgsyXp7rruQ");

export default class App extends Component<{}> {
    constructor(props){
        super(props);

        setTimeout(this.testFunc, 3000);
    }
    testFunc = () => {

        const latitude = 10.2997468;
        const longitude = 123.9031766;
        // this._map.moveTo([longitude, latitude], 200);
        this._map.moveTo([longitude, latitude], 200);
        // this._map.zoomTo(16, 3000);
        console.log("HOOY");
    }
  render () {
    //   return null;
    return (
      <View style={{flex: 1}}>
          <MapboxGL.MapView
          ref={(c) => this._map = c}
          style={{flex: 1}}
          showUserLocation={true}
          zoomLevel={50}
          zoomLevel={15}
          minZoomLevel={15}
        //   zoomEnabled={true}
          >
        </MapboxGL.MapView>
      </View>
      );
  }
}
//*/
/*import React from 'react';
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
*/