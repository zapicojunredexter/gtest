import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    TextInput
} from 'react-native';
import sms from 'react-native-sms-linking';
import { Email } from 'react-native-openanything';

import { getUser } from '../../../selectors/user.selector';
import { getContactList } from '../../../selectors/contacts.selector';
import { colors } from '../../../constants/colors';
import Button from '../../../components/button';

import ContactsAction from '../../../reducers/contacts/contacts.action';

import AddContactModal from './add.contact.modal';
import EditContactModal from './edit.contact.modal';
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
        margin : 10,
        alignItems : 'center',
        justifyContent : 'center',
    },
    addButtonTitle : {
        color : colors.fontColor,
    },
    formControlWrapper : {
        // alignItems : 'flex-end',
        flexDirection : 'row'
    },
});

class Contacts extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['seculacer'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
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
            filterText : '',
            toEdit : null,
        };
    }

    onClickAdd = (data) => {
        const { addContact } = this.props;
        addContact(data);
        this.setState({ isAddModalOpen : false });
    }

    onClickEdit = data => {
        const { editContact } = this.props;
        editContact(data);
        this.setState({ toEdit : null });
    }

    renderContactRow = ({item}) => {
        const { user, deleteContact, editContact } = this.props;
        const styles = _styles(user.type);
        return (
            <View style={styles.rowWrapper}>
                <TouchableOpacity onPress={() => editContact({...item, isFav : !item.isFav})}style={styles.rowLeft}>
                    <Image
                        source={require('../../../assets/images/user.png')}
                        style={styles.userProfilePic}
                    />
                    <View style={styles.txtWrapper}>
                        <Text style={styles.txtName}>{item.name}</Text>
                        <Text style={styles.txtContNo}>{item.contactNum}</Text>
                        <Text style={styles.txtEmail}>{item.email}</Text>
                    </View>
                    {item.isFav && <Text style={{ color : 'yellow', fontSize : 20, }}>★</Text>}
                </TouchableOpacity>
                <View style={styles.rowRight}>
                
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({toEdit : item})
                        }}
                        style={{
                            flex:1,
                            justifyContent : 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require('../../../assets/images/edit.png')}
                            style={{ width : 15, height : 15 }}
                        />
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={() => {
                            Alert.alert(
                                'Delete Contact',
                                'Are you sure you want to delete contact?',
                                [
                                    {
                                        text: 'Yes',
                                        onPress: () => deleteContact(item.id),
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
                        }}
                        style={{
                            flex:1,
                            justifyContent : 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image
                            source={require('../../../assets/images/delete.png')}
                            style={{ width : 20, height : 20 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        const styles = _styles();
        const { isAddModalOpen, filterText, toEdit } = this.state;
        const { contactList } = this.props;
        const filteredContacts = contactList.filter((contact) => {
            const substring = filterText.toLowerCase();
            return (
                contact.name.toLowerCase().indexOf(substring) !== -1 ||
                contact.contactNum.toLowerCase().indexOf(substring) !== -1 ||
                contact.email.toLowerCase().indexOf(substring) !== -1
            );
        })
        return (
            <View style={styles.mainContainer}>
                <View style={styles.formControlWrapper}>
                    <Button
                        style={styles.addButton}
                        titleStyle={styles.addButtonTitle}
                        title="Add"
                        onPress={() => {
                            // Email('');
                            this.setState({ isAddModalOpen : true });
                        }}
                    />
                    <TextInput
                        style={{
                            margin : 10,
                            borderRadius : 3,
                            borderWidth : 1,
                            borderColor : 'gray',
                            flex : 1,
                        }}
                        value={filterText}
                        onChangeText={(value) => this.setState({filterText : value})}
                    />
                </View>
                <FlatList
                    data={filteredContacts}
                    renderItem={this.renderContactRow}
                />
                {isAddModalOpen && (
                    <AddContactModal
                        visible={isAddModalOpen}
                        onClose={() => this.setState({ isAddModalOpen : false })}
                        onSubmit={this.onClickAdd}
                    />
                )}
                {!!toEdit && (
                    <EditContactModal
                        data={toEdit}
                        visible={(!!toEdit)}
                        onClose={() => this.setState({ toEdit : null })}
                        onSubmit={this.onClickEdit}
                    />
                )}
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
    editContact : contact => dispatch(ContactsAction.editContact(contact)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contacts);
