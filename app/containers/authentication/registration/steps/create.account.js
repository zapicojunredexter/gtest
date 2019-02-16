import React from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import RadioButton from '../../../../components/radio.button';

import TextInput from '../../../../components/text.input';
import DatePicker from '../../../../components/date.picker';
import { colors } from '../../../../constants/colors';
const _styles = StyleSheet.create({
    createAccountContainer : {
        width : '100%',
        marginTop : 10,
    },
    textInput : {
        backgroundColor : '#79ACC9',
        paddingLeft : 10,
    },
    textInputWrapper : {
        marginBottom : 5,
    },
});

type Props = {
};

export default class CreateAccount extends React.PureComponent<Props> {
    constructor(props) {
        super(props);
        this.state = {
            fname : { value : '', errorMessage : ''},
            mname : { value : '', errorMessage : ''},
            lname : { value : '', errorMessage : ''},
            phone : { value : '', errorMessage : ''},
            email : { value : '', errorMessage : ''},


            address : { value : '', errorMessage : ''},
            birthdate : { value : '', errorMessage : ''},
            gender : { value : 'male', errorMessage : ''},
        }
    }

    setFields = (key, value) => {
        const currentKeyState = this.state[key];
        this.setState({[key] : { ...currentKeyState, value }});
        this.props.onChangeFields({[key] : value});
    }

    render() {
        const {
            fname,
            mname,
            lname,
            phone,
            email,
            address,
            birthdate,
            gender
        } = this.state;
        return (
            <View style={_styles.createAccountContainer}>
                <TextInput
                    value={fname.value}
                    placeholder="First Name"
                    style={_styles.textInput}
                    error={fname.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChangeText={(value) => this.setFields('fname', value)}
                />
                <TextInput
                    value={mname.value}
                    placeholder="Middle Name"
                    style={_styles.textInput}
                    //error={mname.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChangeText={(value) => this.setFields('mname', value)}
                />
                <TextInput
                    value={lname.value}
                    placeholder="Last Name"
                    style={_styles.textInput}
                    //error={lname.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChangeText={(value) => this.setFields('lname', value)}
                />
                <TextInput
                    value={phone.value}
                    placeholder="Phone"
                    style={_styles.textInput}
                    //error={phone.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChangeText={(value) => this.setFields('phone', value)}
                />
                <TextInput
                    value={email.value}
                    placeholder="Email"
                    style={_styles.textInput}
                    error={email.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChangeText={(value) => this.setFields('email', value)}
                />
                <TextInput
                    value={address.value}
                    placeholder="Address"
                    style={_styles.textInput}
                    error={address.errorMessage}
                    placeholderTextColor="#FFF"
                    wrapperStyle={_styles.textInputWrapper}
                    onChangeText={(value) => this.setFields('address', value)}
                />
                <DatePicker
                    placeholder="Birthdate"
                    style={_styles.textInput}
                    error={birthdate.errorMessage}
                    selectedValue={birthdate.value}
                    wrapperStyle={_styles.textInputWrapper}
                    onValueChange={(value) => this.setFields('birthdate', value)}
                    value={birthdate.value}
                />
                <View>
                    <View style={{marginLeft:10,marginRight:10,flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{color:colors.fontColor}}>Male</Text>
                        <RadioButton
                            checkboxColor="silver"
                            onPress={() => this.setFields('gender', 'male')}
                            selected={gender.value === 'male'}
                        />
                        <Text style={{color:colors.fontColor}}>Female</Text>
                        <RadioButton
                            checkboxColor="silver"
                            onPress={() => this.setFields('gender', 'female')}
                            selected={gender.value === 'female'}
                        />
                    </View>
                    
                </View>
            </View>
        );
    }
}
