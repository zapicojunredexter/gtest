import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TouchableWithoutFeedback,
    Image
} from 'react-native';

import { getUser } from '../../../selectors/user.selector';
import { colors } from '../../../constants/colors';
import Button from '../../../components/button';
import TextInput from '../../../components/text.input';

import ContactsAction from '../../../reducers/seculacer.contacts/seculacer.contacts.action';
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
                        <Image
                            source={require('../../../assets/images/contact.png')}
                            style={{alignSelf : 'center',width : 50,height : 50}}
                        />
                        <TextInput underlineColorAndroid="#336699" placeholder="Name" onChangeText={text => this.setState({ name : text })} value={name} style={{color: 'black'}} />
                        <TextInput underlineColorAndroid="#336699" placeholder="Contact Number" onChangeText={text => this.setState({ contactNum : text })} value={contactNum} style={{color: 'black'}} />
                        <TextInput underlineColorAndroid="#336699" placeholder="Email" onChangeText={text => this.setState({ email : text })} value={email} style={{color: 'black'}} />
                    
                        <View style={{flexDirection  : 'row',justifyContent:'space-between'}}>
                            <Button
                                title="ADD"
                                onPress={() => onSubmit({...this.state})}
                                style={{
                                    backgroundColor : colors.seculacer.main,
                                    width : '47%',
                                    borderRadius : 3,
                                    padding : 10,
                                }}
                                titleStyle={{textAlign : 'center',color : colors.fontColor}}
                            />
                            <Button
                                title="CANCEL"
                                onPress={onClose}
                                style={{
                                    backgroundColor : 'gray',
                                    width : '47%',
                                    borderRadius : 3,
                                    padding : 10,
                                }}
                                titleStyle={{textAlign : 'center',color : colors.fontColor}}
                            />
                        </View>
                    </TouchableOpacity>
                    
                </TouchableOpacity>
            </Modal>
        );
    }
}