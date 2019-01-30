import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native';

import { getUser } from '../../../selectors/user.selector';
import { colors } from '../../../constants/colors';
import Button from '../../../components/button';
import TextInput from '../../../components/text.input';

import ContactsAction from '../../../reducers/contacts/contacts.action';
type Props = {
};


const _styles = (userType = 'seculacer') => StyleSheet.create({
    mainContainer : {
        flex : 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent : 'center',
        alignItems : 'center',
    },
});

export default class AddContact extends React.PureComponent<Props> {
    constructor(props){
        super(props);

        this.state = {
            name : '',
            contactNum : '',
            email : '',
        }
    }

    render() {
        const styles = _styles();
        const { onClose, onSubmit } = this.props;
        const {
            name,
            contactNum,
            email,
        } = this.state;
        return (
            <Modal
                {...this.props}
                onRequestClose={onClose}
                animationType='fade'
                transparent={true}
            >
                <TouchableOpacity onPress={onClose} style={styles.mainContainer}>
                    
                    <TouchableOpacity onPress={null} style={{width : '80%', backgroundColor : 'white', padding : 30}}>
                        <TouchableOpacity onPress={onClose}>
                            <Text>CLOSE</Text>
                        </TouchableOpacity>
                        <TextInput underlineColorAndroid="#336699" placeholder="Name" onChangeText={text => this.setState({ name : text })} value={name} style={{color: 'black'}} />
                        <TextInput underlineColorAndroid="#336699" placeholder="Contact Number" onChangeText={text => this.setState({ contactNum : text })} value={contactNum} style={{color: 'black'}} />
                        <TextInput underlineColorAndroid="#336699" placeholder="Email" onChangeText={text => this.setState({ email : text })} value={email} style={{color: 'black'}} />
                    
                        <Button title="SUBMIT" onPress={() => onSubmit({...this.state})} style={{ backgroundColor : 'blue' }}/>
                    </TouchableOpacity>
                    
                </TouchableOpacity>
            </Modal>
        );
    }
}