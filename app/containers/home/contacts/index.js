import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    Image,
} from 'react-native';

import { getUser } from '../../../selectors/user.selector';
import { colors } from '../../../constants/colors';
import Button from '../../../components/button';
type Props = {
};


const _styles = (userType = 'seculacer') => StyleSheet.create({
    mainContainer : {
        flex : 1,
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
    rowRight : {
        width : 50,
        marginLeft : 5,
        backgroundColor : colors.fieldSetBg,
        alignItems : 'center',
        justifyContent : 'center',
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
    addButton : {
        padding : 10,
        borderRadius : 3,
        backgroundColor : colors[userType].mainHeader,
        width : 100,
        right : 0,
        margin : 10
    },
    addButtonTitle : {
        color : colors.fontColor,
    },
    formControlWrapper : {
        alignItems : 'flex-end',
        flexDirection : 'row'
    },
});

class Contacts extends React.PureComponent<Props> {
    static navigationOptions = {
        title : 'CONTACTS',
    }

    renderContactRow = ({item}) => {
        const { user } = this.props;
        const styles = _styles(user.type);
        return (
            <View style={styles.rowWrapper}>
                <View style={styles.rowLeft}>
                    <Image
                        source={require('../../../assets/images/googlemapsbg.jpg')}
                        style={styles.userProfilePic}
                    />
                    <View style={styles.txtWrapper}>
                        <Text style={styles.txtName}>{item.name}</Text>
                        <Text style={styles.txtContNo}>{item.contact}</Text>
                        <Text style={styles.txtEmail}>{item.email}</Text>
                    </View>
                    {true && <Text style={{ color : 'yellow', fontSize : 20, }}>★</Text>}
                </View>
                <View style={styles.rowRight}>
                    <Text>E</Text>
                    <Text>D</Text>
                </View>
            </View>
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
                <View style={styles.formControlWrapper}>
                    <Button style={styles.addButton} titleStyle={styles.addButtonTitle} title="Add"/>
                </View>
                <FlatList
                    data={sampleData}
                    renderItem={this.renderContactRow}
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
)(Contacts);
