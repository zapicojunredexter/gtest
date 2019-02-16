import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { colors } from '../../../constants/colors';
type Props = {
};


const _styles = (userType = 'seculacer') => StyleSheet.create({
});

class About extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['seculacer'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
    }

    render() {
        return (
            <View>
                <Text>components/about/index.js</Text>
            </View>
        )
    }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(About);
