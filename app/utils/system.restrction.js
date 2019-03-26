import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

export default SystemRestricted = Component => {
    class SystemRestrictedClass extends React.PureComponent<>{
        render() {
            const { hasInternet } = this.props;

            if (hasInternet) {
                return (
                    <Component test={123} {...this.props} />
                );
            }
            return (
                <View>
                    <Text>NO INTERNET CONNECTION</Text>
                </View>
            );
        }
    }

    const mapStateToProps = store => ({
        hasInternet : store.system.hasInternet,
    });
    const mapDispatchToProps = dispatch => ({
        // setHasInternetConnection : () => dispatch(SystemActions.setHasInternet(true))
    });

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(SystemRestrictedClass);
}