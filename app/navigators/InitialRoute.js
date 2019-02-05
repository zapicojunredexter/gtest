import React from 'react';
import { connect } from 'react-redux';
import {
  View,
} from 'react-native';
import { getUser } from '../selectors/user.selector';
import SystemActions from '../reducers/system/system.action';

type Props = {
};


class InitialRoute extends React.Component<Props> {
    constructor(props){
        super(props);
        const { navigation, user, setCurrentPath } = props;
        const goTo = user ? user.type ==='seculacer' ? 'ControlDevice' : 'EDM' : 'Login';
        navigation.navigate(goTo);
        setCurrentPath(goTo);
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InitialRoute);
