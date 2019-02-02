import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
} from 'react-native';
import { colors } from '../../../constants/colors';

type Props = {
};


class Notifications extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['seculacer'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
    }
    // static navigationOptions = {
    //     title : 'NOTIFICATIONS',
    // }
    render() {
        return (
            <View>
                <Text>Notifications</Text>
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
)(Notifications);
