import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import { getUser } from '../selectors/user.selector';

type Props = {
};


class InitialRoute extends React.Component<Props> {
    constructor(props){
        super(props);
        const { navigation, user } = props;
        console.log('HOOOY', user);
        navigation.navigate(user ? user.type ==='seculacer' ? 'ControlDevice' : 'EDM' : 'Login');
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitialRoute);
