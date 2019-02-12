import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Button,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { getUser } from '../../../selectors/user.selector';
import { colors } from '../../../constants/colors';
import HeaderRight from '../../../components/header/header.right';
import HeaderLeft from '../../../components/header/header.left';
import Switch from '../../../components/switch';
import ModalWrapper from '../../../components/modal.wrapper';
import ControlDeviceService from '../../../services/seculacer.control.device.service';
import { getDeviceSettings } from '../../../selectors/seculacer.control.device.selector';
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
        const colorSets = colors['seculacer'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
    }
    // static navigationOptions = ({ navigation }) => {
    //     const colorSets = colors[navigation.state.params && navigation.state.params.user && navigation.state.params.user.type];
    //     return ({
    //         title : 'SECULACE',
    //         headerTitleStyle : {
    //             color : colors.fontColor,
    //         },
    //         headerStyle : {
    //             backgroundColor : colorSets && colorSets.mainHeader,
    //         },
    //         headerRight : <HeaderRight navigation={navigation} />,
    //         headerLeft : <HeaderLeft />
    //     });
    // };

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen : false
        }
    }

    handleChangeSwitch = (key, value) => {
        const { updateDeviceSettings } = this.props;
        updateDeviceSettings({[key] : !value});
    }

    renderRow = (rowDetails, hasSettings) => {
        const styles = _styles('seculacer');
        const { title, description, value, key } = rowDetails;
        return (
            <View style={styles.rowWrapper}>
                <View style={styles.rowLeft}>
                    <View style={styles.leftTexts}>
                        <Text style={styles.settingsTitle}>{title}</Text>
                        <Text style={styles.settingsDesc}>{description}</Text>
                    </View>
                    <Switch
                        onValueChange={() => this.handleChangeSwitch(key, value)}
                        value={value}
                    />
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
        const { user, device } = this.props;
        console.log("HEEEEE",device);
        if(!user) return null;
        const {
            pairDevice,
            sensor,
            gpsLocation,
            makeVisible,
        } = device;
        // const userType = this.props.user.type;
        const styles = _styles('seculacer');
          
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.headerText}>Device Controller</Text>
                {this.renderRow({
                    title : 'Pair Device',
                    description : 'Always pair device',
                    key : 'pairDevice',
                    value : pairDevice,
                },true)}
                {this.renderRow({
                    title : 'Sensor',
                    description : 'Receive notification',
                    key : 'sensor',
                    value : sensor,
                },true)}
                {this.renderRow({
                    title : 'GPS Location',
                    description : 'Auto ON always',
                    key : 'gpsLocation',
                    value : gpsLocation,
                },true)}


                {this.renderRow({
                    title : 'Make location visible',
                    description : 'Allow others to see your location',
                    key : 'makeVisible',
                    value : makeVisible,
                },false)}

                <View style={styles.instructionsContainer} />
                
            </View>
        );
    }
}
const mapStateToProps = store => ({
    user : getUser(store),
    device : getDeviceSettings(store),
});
const mapDispatchToProps = dispatch => ({
    updateDeviceSettings : (settings) => dispatch(ControlDeviceService.updateDeviceSettings(settings))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControlDevice);
