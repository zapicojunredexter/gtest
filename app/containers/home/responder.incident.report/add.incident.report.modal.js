import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ScrollView,
    Image
} from 'react-native';

import { getUser } from '../../../selectors/user.selector';
import { colors } from '../../../constants/colors';
import Button from '../../../components/button';
import TextInput from '../../../components/text.input';

import ContactsAction from '../../../reducers/seculacer.contacts/seculacer.contacts.action';
type Props = {
};

const _styles = (userType = 'responder') => StyleSheet.create({
    mainContainer : {
        flex : 1,
    },
    textInput : {
        borderWidth:0,
        backgroundColor : colors.fieldSetBg,
        margin : 5
    }
});
export default class AddContact extends React.PureComponent<Props> {
    constructor(props){
        super(props);

        this.state = {
            name : {
                value : '',
                error : '',
            },
            userId : {
                value : '',
                error : '',
            },
            reportNo : {
                value : '',
                error : '',
            },
            location : {
                value : '',
                error : '',
            },
            time : {
                value : '',
                error : '',
            },
            date : {
                value : '',
                error : '',
            },
            sex : {
                value : '',
                error : '',
            },
            status : {
                value : '',
                error : '',
            },
            description : {
                value : '',
                error : '',
            },
            remarks : {
                value : '',
                error : '',
            },
        }
    }

    onChangeFields = (key,value) => {
        const currentKeyState = this.state[key];
        this.setState({ [key] : {...currentKeyState, value} });
    }

    onSubmit = () => {
        this.props.onSubmitReport({...this.state});
    }

    render() {
        const styles = _styles();
        const { onClose, onSubmit } = this.props;
        return (
            <Modal
                {...this.props}
                onRequestClose={onClose}
                animationType='fade'
                transparent={true}
            >
                <TouchableOpacity
                    onPress={onClose}
                    style={{
                        padding : 40,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    }}
                >
                    <ScrollView>
                        <TouchableOpacity activeOpacity={1} style={{padding : 20,backgroundColor:'white'}}>
                            <Text style={{fontSize : 15, color : colors.responder.mainHeader}}>Add Incident Report</Text>
                            <View style={{flexDirection : 'row'}}>
                                <Image
                                    style={{width : 50,height:50}}
                                    source={require('../../../assets/images/user.png')}
                                />
                                <View style={{marginBottom : 20, flex : 1}}>
                                    <TextInput onChangeText={text => this.onChangeFields('name',text)} value={this.state.name.value} style={styles.textInput} placeholder="Victim's Name" />
                                    <TextInput onChangeText={text => this.onChangeFields('userId',text)} value={this.state.userId.value} style={styles.textInput} placeholder="User ID" />
                                    <TextInput onChangeText={text => this.onChangeFields('reportNo',text)} value={this.state.reportNo.value} style={styles.textInput} placeholder="Report Number" />
                                    <TextInput onChangeText={text => this.onChangeFields('location',text)} value={this.state.location.value} style={styles.textInput} placeholder="Location" />
                                    <TextInput onChangeText={text => this.onChangeFields('time',text)} value={this.state.time.value} style={styles.textInput} placeholder="Time" />
                                    <TextInput onChangeText={text => this.onChangeFields('date',text)} value={this.state.date.value} style={styles.textInput} placeholder="Date" />
                                    <TextInput onChangeText={text => this.onChangeFields('sex',text)} value={this.state.sex.value} style={styles.textInput} placeholder="Sex" />
                                    <TextInput onChangeText={text => this.onChangeFields('status',text)} value={this.state.status.value} style={styles.textInput} placeholder="Incident Status" />
                                    <TextInput onChangeText={text => this.onChangeFields('description',text)} value={this.state.description.value} style={styles.textInput} placeholder="Incident Description" />
                                    <TextInput onChangeText={text => this.onChangeFields('remarks',text)} value={this.state.remarks.value} style={styles.textInput} placeholder="Remarks" />



                                    <View style={{flexDirection  : 'row',justifyContent:'space-between'}}>
                                        <Button
                                            title="SUBMIT"
                                            onPress={this.onSubmit}
                                            style={{
                                                backgroundColor : colors.responder.main,
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
                                </View>
                            
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </TouchableOpacity>
            </Modal>
        );
    }
}