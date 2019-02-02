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
        };
    }

    onClickAdd = (data) => {
        const { addContact } = this.props;
        addContact(data);
        this.setState({ isAddModalOpen : false });
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
                    <Text>E</Text>
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
                    <TextInput
                        style={{
                            margin : 10,
                            borderRadius : 3,
                            borderWidth : 1,
                            borderColor : 'gray',
                            flex : 1,
                        }}
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
    editContact : contact => dispatch(ContactsAction.editContact(contact)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Contacts);
