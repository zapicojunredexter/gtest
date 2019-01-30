import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
} from 'react-native';

import { getUser } from '../../../selectors/user.selector';
import { colors } from '../../../constants/colors';
import HeaderRight from '../../../components/header/header.right';
import HeaderLeft from '../../../components/header/header.left';
import Button from '../../../components/button';
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

        this.state = {
            currentPage : 0,
        }
    }

    renderTabHeaders = () => {
        const userType = this.props.user.type
        const styles = _styles(userType);
        const { currentPage } = this.state;
        return (
            <View style={styles.tabsHeaderWrapper}>
                <Text onPress={() => this.setState({ currentPage : 0 })} style={[styles.tabLabel,currentPage === 0 && styles.activeTab]}>EDM</Text>
                <Text onPress={() => this.setState({ currentPage : 1 })} style={[styles.tabLabel,currentPage === 1 && styles.activeTab]}>RESPONDED</Text>
                <Text onPress={() => this.setState({ currentPage : 2 })} style={[styles.tabLabel,currentPage === 2 && styles.activeTab]}>DONE</Text>
            </View>
        );
    }

    renderEDMRow = ({item}) => {
        const { user } = this.props;
        const styles = _styles(user.type);
        return (
            <TouchableOpacity onPress={() => this.onSelectItem(item)} style={styles.rowWrapper}>
                <View style={styles.rowLeft}>
                    <Image
                        source={require('../../../assets/images/googlemapsbg.jpg')}
                        style={styles.userProfilePic}
                    />
                    <View style={styles.txtWrapper}>
                        <Text style={styles.txtName}>{item.name}</Text>
                        <Text style={styles.txtContNo}>{`${item.contact}        ${item.email}`}</Text>
                        <View style={styles.buttonWrapper}>
                            <Button titleStyle={styles.msgTitleButton} style={[styles.button,styles.msgButton]} title="MESSAGE" />
                            <Button titleStyle={styles.callTitleButton} style={[styles.button,styles.callButton]} title="CALL" />
                        </View>
                    </View>
                    <Text>ARROW</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const styles = _styles();
        const sampleData = [
            {
                name : 'person 1',
                contact : 'contact 1',
                email : 'email 1',
            },
            {
                name : 'person 2',
                contact : 'contact 2',
                email : 'email 2',
            },
            {
                name : 'person 3',
                contact : 'contact 3',
                email : 'email 3',
            },
            {
                name : 'person 4',
                contact : 'contact 4',
                email : 'email 4',
            }
        ];

        return (
            <View style={styles.mainContainer}>
                {this.renderTabHeaders()}
                <FlatList
                    data={sampleData}
                    renderItem={this.renderEDMRow}
                />
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
)(EDM);
