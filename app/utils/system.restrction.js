import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

export default SystemRestricted = (Component, options = {}) => {
    class SystemRestrictedClass extends React.PureComponent<>{
        static navigationOptions = {...options.navigationOptions};
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
                <View>
                    {!disableCheckInternet && !hasInternet && (
                        <Text>NO INTERNET CONNECTION</Text>
                    )}
                    {!disableCheckLocation && !hasLocation && (
                        <Text>NO LOCATION</Text>
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