import React from 'react';
import { AppState, BackHandler, NetInfo } from 'react-native';
import { connect } from 'react-redux';
import SystemActions from '../reducers/system/system.action';

class Listeners extends React.PureComponent<> {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };

    AppState.addEventListener('change', this.handleAppStateChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.getConnectionInfo().then((connectionInfo) => {
        props.setHasInternetConnection(connectionInfo.type !== 'none');
      });
    // this.getCurrentLocation();
    this.listenCurrentLocation();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    AppState.removeEventListener('change', this.handleAppStateChange);
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleConnectivityChange,
    );
  }

    listenCurrentLocation = () => {
        // not the best method. still needs more research
        setInterval(this.getCurrentLocation, 5000);
    }

    getCurrentLocation = () => {
        const { setCurrentLocation } = this.props;
        navigator.geolocation.getCurrentPosition(
            location => {
                const {
                    latitude,
                    longitude
                } = location.coords;
                setCurrentLocation({ latitude, longitude });
            },
            error => {
                setCurrentLocation(null);
            }
        );
    }

  listenLocation = () => {
    navigator.geolocation.watchPosition((location) =>{
        console.log("LOCATION SUCESS",location);
    }, (error) => {
        console.log("LOCATION ERROR",error);
    });
  }

  handleBackButton = () => {
      this.props.navigation.goBack(null);
  };

  handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // it is called when the app become active
    } else if (
      this.state.appState === 'active' &&
      nextAppState.match(/inactive|background/)
    ) {
      // it is called when the app become inactive or background
    }
    this.setState({ appState: nextAppState });
  };

  handleConnectivityChange = (connectInfo) => {
      const { setHasInternetConnection } = this.props;
    if (connectInfo.type === 'none') {
      // it is called when the app connection become offline
      setHasInternetConnection(false);
    } else {
      // it is called if the app connection become offline
      setHasInternetConnection(true);
    }
  };

  render() {
    return null;
  }
}

const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
    setHasInternetConnection : (hasInternet) => dispatch(SystemActions.setHasInternet(hasInternet)),
    setCurrentLocation : coords => dispatch(SystemActions.setCurrentLocation(coords))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Listeners);
