import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default SystemRestricted = (Component, options = {}) => {
    class SystemRestrictedClass extends React.PureComponent<>{
        // static navigationOptions = {...options.navigationOptions};
        static navigationOptions = options.navigationOptions;
        render() {
            const { hasInternet, hasLocation } = this.props;
            const {
                disableCheckInternet,
                disableCheckLocation,
            } = options;
            const passed =
                (disableCheckInternet || hasInternet) &&
                (disableCheckLocation || hasLocation);
            if (passed) {
                return (
                    <Component test={123} {...this.props} />
                );
            }
            return (
                <View style={{backgroundColor: '#dae1e8', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    {!disableCheckInternet && !hasInternet && (
                        <View style={{margin: 15, alignItems: 'center', justifyContent: 'center'}}>
                            <MaterialIcons name="signal-cellular-connected-no-internet-4-bar" size={35} color="#3d5166" />
                            <Text style={{ fontWeight: 'bold' }}>NO INTERNET CONNECTION</Text>
                            <Text style={{ fontSize : 12 }}>Please make sure you are connected to the internet.</Text>
                        </View>
                    )}
                    {!disableCheckLocation && !hasLocation && (
                        <View style={{margin: 30, alignItems: 'center', justifyContent: 'center'}}>
                            <MaterialIcons name="location-off" size={35} color="#3d5166" />
                            <Text style={{ fontWeight: 'bold' }}>NO LOCATION PROVIDER</Text>
                            <Text style={{ fontSize : 12 }}>Please turn on location in device settings.</Text>
                        </View>
                    )}
                </View>
            );
        }
    }

    const mapStateToProps = store => ({
        hasInternet : store.system.hasInternet,
        hasLocation : !!store.system.currentLocation
    });
    const mapDispatchToProps = dispatch => ({
        // setHasInternetConnection : () => dispatch(SystemActions.setHasInternet(true))
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(SystemRestrictedClass);
}