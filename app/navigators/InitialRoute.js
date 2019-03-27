import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
} from 'react-native';
import Listener from '../listeners/listeners.navigation';
import SystemActions from '../reducers/system/system.action';
import firebase from 'react-native-firebase';

type Props = {
};


class InitialRoute extends React.Component<Props> {
    constructor(props){
        super(props);
        const { navigation } = props;
        navigation.navigate('Login');

        // firebase.auth()
        //     .signInAnonymously()
        //     .then(credential => {
        //     if (credential) {
        //         console.log('default app user ->', credential.user.toJSON());
        //     }
        //     }).catch(error => console.log(error));


        this.ref = firebase.firestore().collection('todos');
        this.ref.add({
            title: 'test title',
            complete: false,
          });

          this.ref.onSnapshot(this.onCollectionUpdate)
    }
    onCollectionUpdate = (querySnapshot) => {
        console.log("HOY", querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log("HEREES DOC DATA", doc.data());
          });
    }
  render() {
    return (
      <View>
          <Listener {...this.props} />
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
