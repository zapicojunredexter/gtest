import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { getUser } from '../selectors/user.selector';

type Props = {
  navigation: {
    navigate: Function,
    dispatch: Function,
  },
};

class DrawerMenu extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    const styles = {};

    return (
      <View style={{backgroundColor : 'red'}}>
        <View style={{}}>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('TermsOfService')}
        >
          <Text>利用規約</Text>
        </TouchableOpacity>
        <View style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => navigation.navigate('PrivacyPolicy')}
          style={styles.drawerItem}
        >
          <Text style={styles.drawerItemText}>プライバシーポリシー</Text>
        </TouchableOpacity>
        <View style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => navigation.navigate('SpecifiedCommercialTransactions')}
          style={styles.drawerItem}
        >
          <Text style={styles.drawerItemText}>特定商取引法に基づく表示</Text>
        </TouchableOpacity>
        <View style={styles.dividerStyle} />
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={this.onClickLogout}
        >
          <Text style={styles.drawerItemText}>ログアウト</Text>
        </TouchableOpacity>
        <View style={styles.dividerStyle} />
      </View>
    );
  }
}

const mapStateToProps = store => ({
    user : getUser(store),
});
const mapDispatchProps = dispatch => ({
});

export default connect(
    mapStateToProps,
  mapDispatchProps,
)(DrawerMenu);