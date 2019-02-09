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
import ResponderWatchlistService from '../../../services/responder.watchlist.service';
import { getSeculacerWatchList } from '../../../selectors/responder.watchlist.selector';
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
        padding : 3,
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

    constructor(props) {
        super(props);
        const { navigation, fetchWatchList } = props;
        this.state = {
            currentPage : 0,
        };
        fetchWatchList();
    }

    onSelectItem = (data) => {
        Alert.alert(
            'Confirm Transaction',
            'Are you sure you want to proceed?',
            [
                {
                    text: 'Yes',
                    onPress: () => {   
                        const { navigation, updateWatchlist } = this.props;
                        if(data.status < 2){
                            updateWatchlist({...data, status : data.status + 1});
                        }else{
                            updateWatchlist({...data, status : data.status - 1});
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
                <Text onPress={() => this.setState({ currentPage : 0 })} style={[styles.tabLabel,currentPage === 0 && styles.activeTab]}>APPLICANTS</Text>
                <Text onPress={() => this.setState({ currentPage : 1 })} style={[styles.tabLabel,currentPage === 1 && styles.activeTab]}>WATCHLIST</Text>
                <Text onPress={() => this.setState({ currentPage : 2 })} style={[styles.tabLabel,currentPage === 2 && styles.activeTab]}>BLOCKED</Text>
            </View>
        );
    }

    renderEDMRow = ({item}) => {
        const { user } = this.props;
        const styles = _styles('responder');
        return (
            <TouchableOpacity onLongPress={() => {
                const alertStrings = {
                    0 : {
                        title : 'Approve seculacer',
                        desc : 'Are you sure you want to approve seculacer?',
                    },
                    1 : {
                        title : 'Block seculacer',
                        desc : 'Are you sure you want to block seculacer?',
                    },
                    2 : {
                        title : 'Unblock seculacer',
                        desc : 'Are you sure you want to unblock seculacer?',
                    },
                };
                Alert.alert(
                    alertStrings[item.status].title,
                    alertStrings[item.status].desc,
                    [
                        {
                            text: 'Yes',
                            onPress: () => this.onSelectItem(item),
                        },
                        {
                            text: 'Cancel',
                            onPress: () => {},
                            style: 'cancel',
                        },
                    ],
                    {cancelable: false},
                );
                ;
            }} style={styles.rowWrapper}>
                <View style={styles.rowLeft}>
                    <Image
                        source={require('../../../assets/images/user.png')}
                        style={styles.userProfilePic}
                    />
                    <View style={styles.txtWrapper}>
                        <Text style={styles.txtName}>{item.name}</Text>
                        <Text style={styles.txtContNo}>{item.address}</Text>
                        <View style={styles.buttonWrapper}>
                            <Button
                                onPress={() => {
                                    alert(JSON.stringify(item));
                                }}
                                style={[styles.button,styles.msgButton]}
                                title="VIEW PROFILE"
                                titleStyle={{
                                    textAlign : 'center',
                                    color : colors.responder.mainHeader
                                }}
                            />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const styles = _styles();
        const { seculacersList } = this.props;
        const { currentPage } = this.state;
        const seculacerData = seculacersList.filter(seculacer => {
            return (seculacer.status === currentPage);
        });
        // const edmsData = edms.filter(edm => {
        //     return (edm.type === currentPage);
        // });
        return (
            <View style={styles.mainContainer}>
                {this.renderTabHeaders()}
                <FlatList
                    data={seculacerData}
                    renderItem={this.renderEDMRow}
                />
            </View>
        );
    }
}
const mapStateToProps = store => ({
    user : getUser(store),
    seculacersList : getSeculacerWatchList(store),
});
const mapDispatchToProps = dispatch => ({
    fetchWatchList : () => dispatch(ResponderWatchlistService.fetchSeculacers()),
    updateWatchlist : (newEDM) => dispatch(ResponderWatchlistService.updateWatchlist(newEDM)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EDM);
