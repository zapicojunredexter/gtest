import React from 'react';
import { connect } from 'react-redux';
import {
    PermissionsAndroid,
  View,
} from 'react-native';
import { getUser } from '../selectors/user.selector';
import SystemActions from '../reducers/system/system.action';

type Props = {
};


class InitialRoute extends React.Component<Props> {
    constructor(props){
        super(props);
        const { navigation, user, setCurrentPath, setCurrentLocation } = props;
        const goTo = user ? user.type ==='seculacer' ? 'ControlDevice' : 'EDM' : 'Login';
        navigation.navigate(goTo);
        setCurrentPath(goTo);
        this.initializeFetchLocation();
    }

    initializeFetchLocation = async () => {
        try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Seculace Location Permission',
                message:
                  'Seculace App needs access to your location ' +
                  'so you can make emergency messages.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                this.fetchLocationListener();
            }
        } catch (err) {
          alert(err.message);
        }
    }

    fetchLocationListener = () => {
        
        const watcherId = navigator.geolocation.watchPosition((par) => {
            const { setCurrentLocation } = this.props;
            setCurrentLocation({
                latitude : par.coords.latitude,
                longitude : par.coords.longitude,
            });

        },
        (error) => {
            const { setCurrentLocation } = this.props;
            setCurrentLocation({
                latitude : null,
                longitude : null,
            });
            navigator.geolocation.stopObserving(watcherId);
            setTimeout(this.fetchLocationListener, 5000);
        },{
            timeout: 20000,
            enableHighAccuracy : true,
            distanceFilter : 5,
        });
    }
  render() {
    return (
      <View />
    );
  }
}
const mapStateToProps = store => ({
    user : getUser(store),
});
const mapDispatchToProps = dispatch => ({
    setCurrentPath : (path) => dispatch(SystemActions.setCurrentPath(path)),
    setCurrentLocation : location => dispatch(SystemActions.setCurrentLocation(location)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitialRoute);
