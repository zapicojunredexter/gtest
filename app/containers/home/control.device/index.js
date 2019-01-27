import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Button,
    StyleSheet
} from 'react-native';
import { getUser } from '../../../selectors/user.selector';
import { colors } from '../../../constants/colors';
import HeaderRight from '../../../components/header/header.right';
import HeaderLeft from '../../../components/header/header.left';
import Switch from '../../../components/switch';

type Props = {
};

const _styles = (userType = 'seculacer') => StyleSheet.create({
    mainContainer : {
    },
    headerText : {
        textAlign : 'center',
        color : colors[userType].mainHeader,
        fontSize : 22,
        marginTop : 10,
        marginBottom : 10,
    },
    rowWrapper : {
        flexDirection : 'row',
        marginLeft : 20,
        marginRight : 20,
        marginBottom : 5,
    },
    rowLeft : {
        flex  : 1,
        backgroundColor : colors.fieldSetBg,
        flexDirection : 'row',
        padding : 10,
    },
    rowRight : {
        width : '20%',
        marginLeft : 5,
        backgroundColor : colors.fieldSetBg,
    },
    leftTexts : {
        flex : 1,
    },
    settingsTitle : {
        fontSize : 20,
        color : colors.switchColor
    },
    settingsDesc : {
        color : '#4ac96d',
    },
    instructionsContainer : {
        marginLeft : 20,
        marginRight : 20,
        marginBottom : 5,
        backgroundColor : colors.fieldSetBg,
        height : 100,
    },
});

class ControlDevice extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors[navigation.state.params && navigation.state.params.user.type];
        return ({
            title : 'SECULACE',
            headerTitleStyle : {
                color : colors.fontColor,
            },
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
            headerRight : <HeaderRight />,
            headerLeft : <HeaderLeft />
        });
    };

    constructor(props) {
        super(props);
        const { navigation } = props;
        navigation.setParams({ user : { ...props.user }});
    }

    renderRow = (rowDetails, hasSettings) => {
        const userType = this.props.user.type;
        const styles = _styles(userType);
        const { title, description, value } = rowDetails;
        return (
            <View style={styles.rowWrapper}>
                <View style={styles.rowLeft}>
                    <View style={styles.leftTexts}>
                        <Text style={styles.settingsTitle}>{title}</Text>
                        <Text style={styles.settingsDesc}>{description}</Text>
                    </View>
                    <Switch value={value} />
                </View>
                {hasSettings && (
                    <View style={styles.rowRight}>
                        <Text>RIGHT</Text>
                    </View>
                )}
            </View>
        );
    }
    render() {
        const userType = this.props.user.type;
        const styles = _styles(userType);
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.headerText}>Device Controller</Text>
                {this.renderRow({
                    title : 'Pair Device',
                    description : 'Always pair device',
                    value : true,
                },true)}
                {this.renderRow({
                    title : 'Sensor',
                    description : 'Receive notification',
                    value : true,
                },true)}
                {this.renderRow({
                    title : 'GPS Location',
                    description : 'Auto ON always',
                    value : true,
                },true)}


                {this.renderRow({
                    title : 'Make location visible',
                    description : 'Allow others to see your location',
                    value : true,
                },false)}

                <View style={styles.instructionsContainer} />
                <Button title="messages" onPress={() => this.props.navigation.navigate('Messages',{something:true})}/>
                
            </View>
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
)(ControlDevice);
