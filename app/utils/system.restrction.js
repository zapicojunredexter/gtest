import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

export default SystemRestricted = Component => {
    class SystemRestrictedClass extends React.PureComponent<>{
        render() {
            const { hasInternet, hasLocation } = this.props;
            console.log("NAUSAB",hasInternet,hasLocation);
            if (hasInternet && hasLocation) {
                return (
                    <Component test={123} {...this.props} />
                );
            }
            return (
                <View>
                    {!hasInternet && (
                        <Text>NO INTERNET CONNECTION</Text>
                    )}
                    {!hasLocation && (
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