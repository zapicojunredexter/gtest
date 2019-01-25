import React from 'react';
import { connect } from 'react-redux';
import {
  SectionList,
  Text,
  Button,
  View,
  // CameraRoll,
} from 'react-native';

type Props = {
};


class Home extends React.Component<Props> {
    static navigationOptions = {
        title : 'wasadasda',
    }
  render() {
    return (
      <View
      >
        <Text>home</Text>
        <Button title="navigate" onPress={() =>
            {
                console.log("HOOOY");
                this.props.navigation.navigate('Login');
            }} />
        
        <Button title="ToggleDrawer" 
            onPress={() => 
  this.props.navigation.openDrawer()}/>
      </View>
    );
  }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
