import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';

import SystemActions from '../reducers/system/system.action';

type Props = {
};


class InitialRoute extends React.Component<Props> {
    constructor(props){
        super(props);
        const { navigation } = props;
        navigation.navigate('Login');
    }
  render() {
    return (
      <View>
        <Text>INITIAL ROUTE</Text>
      </View>
    );
  }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
    setHasInternetConnection : () => dispatch(SystemActions.setHasInternet(true))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitialRoute);
