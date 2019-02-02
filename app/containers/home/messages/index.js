import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList
} from 'react-native';

import { colors } from '../../../constants/colors';

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


class Messages extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['seculacer'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
    }
    // static navigationOptions = {
    //     title : 'MESSAGES',
    //     headerLeft : null,
    // }

    onSelectItem = () => {

    }
    
    renderContactRow = ({item}) => {
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
                        <Text style={styles.txtContNo}>{item.contact}</Text>
                        <Text style={styles.txtEmail}>{item.email}</Text>
                    </View>
                    {true && <Text style={{ color : 'yellow', fontSize : 20, }}>★</Text>}
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
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Messages);
