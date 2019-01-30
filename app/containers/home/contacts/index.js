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
import { getContactList } from '../../../selectors/contacts.selector';
import { colors } from '../../../constants/colors';
import Button from '../../../components/button';

import ContactsAction from '../../../reducers/contacts/contacts.action';

import AddContactModal from './add.contact.modal';
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

    constructor(props){
        super(props);
        // props.setContacts([
        //     {test:'test1'},
        //     {test:'test2'},
        //     {test:'test3'},
        //     {test:'test4'},
        // ]);
        // props.setContacts([]);
        this.state = {
            isAddModalOpen : false,
        };
    }

    onClickAdd = (data) => {
        const { addContact } = this.props;
        addContact(data);
        this.setState({ isAddModalOpen : false });
    }

    renderContactRow = ({item}) => {
        const { user, deleteContact } = this.props;
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
                        <Text style={styles.txtContNo}>{item.contactNum}</Text>
                        <Text style={styles.txtEmail}>{item.email}</Text>
                    </View>
                    {true && <Text style={{ color : 'yellow', fontSize : 20, }}>★</Text>}
                </View>
                <View style={styles.rowRight}>
                    <Text>E</Text>
                    <Text onPress={() => deleteContact(JSON.stringify(item))}>D</Text>
                </View>
            </View>
        );
    }

    render() {
        const styles = _styles();
        const { isAddModalOpen } = this.state;
        const { contactList } = this.props;
        return (
            <View style={styles.mainContainer}>
                <View style={styles.formControlWrapper}>
                    <Button
                        style={styles.addButton}
                        titleStyle={styles.addButtonTitle}
                        title="Add"
                        onPress={() => this.setState({ isAddModalOpen : true })}
                    />
                </View>
                <FlatList
                    data={contactList}
                    renderItem={this.renderContactRow}
                />
                <AddContactModal
                    visible={isAddModalOpen}
                    onClose={() => this.setState({ isAddModalOpen : false })}
                    onSubmit={this.onClickAdd}
                />
            </View>
        );
    }
}
const mapStateToProps = store => ({
    user : getUser(store),
    contactList : getContactList(store),
});
const mapDispatchToProps = dispatch => ({
    setContacts : contacts => dispatch(ContactsAction.setContacts(contacts)),
    addContact : contact => dispatch(ContactsAction.addContact(contact)),
    deleteContact : contactId => dispatch(ContactsAction.deleteContact(contactId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contacts);
