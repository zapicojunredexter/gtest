import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    Alert
} from 'react-native';
import { Call, Text as TextSMS } from 'react-native-openanything';
import { getUser } from '../../../selectors/user.selector';
import { colors } from '../../../constants/colors';
import HeaderRight from '../../../components/header/header.right';
import HeaderLeft from '../../../components/header/header.left';
import Button from '../../../components/button';
import responderEdmsService from '../../../services/responder.edms.service';
import { getEDMs } from '../../../selectors/responder.edms.selector';
type Props = {
};

const _styles = (userType = 'seculacer') => StyleSheet.create({
    mainContainer : {
        flex : 1,
    },
    tabsHeaderWrapper : {
        flexDirection : 'row',
        backgroundColor :  '#ED6D69',
    },
    tabLabel : {
        flex : 1,
        color : colors.responder.mainHeader,
        textAlign : 'center',
        fontSize : 15,
        padding : 10,
        borderBottomWidth : 2,
        borderBottomColor : 'transparent'
    },
    activeTab : {
        borderBottomColor : colors.responder.mainHeader,
    },
    

    rowWrapper : {
        marginLeft : 5,
        marginRight : 5,
        marginBottom : 5,
        flexDirection : 'row',
    },
    rowLeft : {
        flex : 1,
        backgroundColor : colors.fieldSetBg,
        flexDirection : 'row',
        padding : 10,
        alignItems : 'center',
    },
    userProfilePic : {
        width : null,
        height : 60,
        alignSelf : 'center',
        aspectRatio : 1,
        resizeMode : 'cover',
    },
    txtName : {
        fontSize : 15,
        color : colors[userType].mainHeader,
    },
    txtContNo : {
        fontSize : 15,
    },
    txtEmail : {
        color : 'silver',
    },
    txtWrapper : {
        margin : 10,
        flex : 1,
    },
    buttonWrapper : {
        flexDirection : 'row',
        justifyContent : 'space-between'
    },
    button : {
        width : '47%',
        borderWidth : 1,
        borderColor : colors.responder.mainHeader,
        borderRadius : 3,
    },
    msgButton : {

    },
    msgTitleButton : {
        color : colors.responder.mainHeader,
        textAlign : 'center',
    },
    callButton : {
        backgroundColor : colors.responder.mainHeader,
    },
    callTitleButton : {
        color : colors.fontColor,
        textAlign : 'center',
    }
});

class EDM extends React.PureComponent<Props> { 
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['responder'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
    };

    // static navigationOptions = ({ navigation }) => {
    //     const colorSets = colors[navigation.state.params && navigation.state.params.user.type];
    //     return ({
    //         title : 'SECULACE',
    //         headerTitleStyle : {
    //             color : colors.fontColor,
    //         },
    //         headerStyle : {
    //             backgroundColor : colorSets && colorSets.mainHeader,
    //         },
    //         headerRight : <HeaderRight />,
    //         headerLeft : <HeaderLeft />
    //     });
    // };

    constructor(props) {
        super(props);
        const { navigation, fetchEDMs } = props;
        navigation.setParams({ user : { ...props.user }});
        fetchEDMs();
        this.state = {
            currentPage : 0,
        }
    }

    onSelectItem = (data) => {
        // alert(JSON.stringify(data));

        Alert.alert(
            'Confirm Transaction',
            'Are you sure you want to proceed?',
            [
                {
                    text: 'Yes',
                    onPress: () => {
                        const { navigation, updateEDMs } = this.props;
                        if(data.type < 2){
                            updateEDMs({...data, type : data.type + 1});
                        }else{
                            alert('TOBE SUBMITTED');
                        }
                    },
                },
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel',
                },
            ],
            {cancelable: false},
        );
        // navigation.navigate('IncidentReport', {...data});
    }

    renderTabHeaders = () => {
        const styles = _styles('responder');
        const { currentPage } = this.state;
        return (
            <View style={styles.tabsHeaderWrapper}>
                <Text onPress={() => this.setState({ currentPage : 0 })} style={[styles.tabLabel,currentPage === 0 && styles.activeTab]}>EDM</Text>
                <Text onPress={() => this.setState({ currentPage : 1 })} style={[styles.tabLabel,currentPage === 1 && styles.activeTab]}>RESPONDED</Text>
                <Text onPress={() => this.setState({ currentPage : 2 })} style={[styles.tabLabel,currentPage === 2 && styles.activeTab]}>DONE</Text>
            </View>
        );
    }

    onPressSMS = (contNumber, message) => {
        TextSMS(contNumber, message).catch(err => alert(err.message));
    }

    onPressCall = (contNumber) => {
        Call(contNumber).catch(err => alert(err.message));
    }

    renderEDMRow = ({item}) => {
        const { user } = this.props;
        const styles = _styles('responder');
        return (
            <View style={styles.rowWrapper}>
                <View style={styles.rowLeft}>
                    <Image
                        source={require('../../../assets/images/user.png')}
                        style={styles.userProfilePic}
                    />
                    <View style={styles.txtWrapper}>
                        <Text style={styles.txtName}>{item.name}</Text>
                        <Text style={styles.txtContNo}>{`${item.contact}        ${item.email}`}</Text>
                        <View style={styles.buttonWrapper}>
                            <Button onPress={() => this.onPressSMS(item.contact, '')} titleStyle={styles.msgTitleButton} style={[styles.button,styles.msgButton]} title="MESSAGE" />
                            <Button onPress={() => this.onPressCall(item.contact)} titleStyle={styles.callTitleButton} style={[styles.button,styles.callButton]} title="CALL" />
                        </View>
                    </View>
                    {item.type < 2 && (
                        <TouchableOpacity onPress={() => this.onSelectItem(item)}>
                        <Image
                            source={require('../../../assets/images/red-right.png')}
                            style={{height : 20, width : 20}}
                        />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    }

    render() {
        const styles = _styles();
        const { edms } = this.props;
        const { currentPage } = this.state;
        const edmsData = edms.filter(edm => {
            return (edm.type === currentPage);
        });
        return (
            <View style={styles.mainContainer}>
                {this.renderTabHeaders()}
                <FlatList
                    data={edmsData}
                    renderItem={this.renderEDMRow}
                />
            </View>
        );
    }
}
const mapStateToProps = store => ({
    user : getUser(store),
    edms : getEDMs(store),
});
const mapDispatchToProps = dispatch => ({
    fetchEDMs : () => dispatch(responderEdmsService.fetchEDMs()),
    updateEDMs : (newEDM) => dispatch(responderEdmsService.updateEDMs(newEDM)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EDM);
