import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { colors } from '../../../constants/colors';
import TextInput from '../../../components/text.input';
import DatePicker from '../../../components/date.picker';
import Button from '../../../components/button';
import RadioButton from '../../../components/radio.button';

import { getUser } from '../../../selectors/user.selector';
import UserService from '../../../services/user.service';
type Props = {
};


const styles = (userType = 'seculacer') => StyleSheet.create({
    textInput : {
        backgroundColor : colors.fieldSetBg,
        paddingLeft : 10,
        color : 'black',
    },
    textInputWrapper : {
        marginBottom : 5,
    },
});

class ResponderProfile extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['responder'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
    }

    constructor(props){
        super(props);
        const { user } = props;
        
        this.state = {
            ...this.getInitialState(),
        };
    }
    
    getInitialState  = () => {
        const { user } = this.props;
        return {
            fname : { value : user.fname, errorMessage : ''},
            mname : { value : user.mname, errorMessage : ''},
            lname : { value : user.lname, errorMessage : ''},
            phone : { value : user.phone, errorMessage : ''},
            email : { value : user.email, errorMessage : ''},


            address : { value : user.address, errorMessage : ''},
            birthdate : { value : user.birthdate, errorMessage : ''},
            gender : { value : user.gender, errorMessage : ''},
        };
    }

    onSubmit = () => {
        this.props.updateUser({...this.state});
    }

    setFields = (key, value) => {
        const currentKeyState = this.state[key];
        this.setState({[key] : { ...currentKeyState, value }});
    }

    render() {
        const _styles = styles();
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
            <View style={{flex : 1, padding : 20}}>
                <Text style={{fontSize : 20, fontWeight:'bold'}}>Account Detils</Text>
                <ScrollView contentContainerStyle={{flex : 1}}>
                    
                        
                    <TextInput
                        value={fname.value}
                        placeholder="First Name"
                        style={_styles.textInput}
                        error={fname.errorMessage}
                        wrapperStyle={_styles.textInputWrapper}
                        onChangeText={(value) => this.setFields('fname', value)}
                    />
                    <TextInput
                        value={mname.value}
                        placeholder="Middle Name"
                        style={_styles.textInput}
                        //error={mname.errorMessage}
                        wrapperStyle={_styles.textInputWrapper}
                        onChangeText={(value) => this.setFields('mname', value)}
                    />
                    <TextInput
                        value={lname.value}
                        placeholder="Last Name"
                        style={_styles.textInput}
                        //error={lname.errorMessage}
                        wrapperStyle={_styles.textInputWrapper}
                        onChangeText={(value) => this.setFields('lname', value)}
                    />
                    <TextInput
                        value={phone.value}
                        placeholder="Phone"
                        style={_styles.textInput}
                        //error={phone.errorMessage}
                        wrapperStyle={_styles.textInputWrapper}
                        onChangeText={(value) => this.setFields('phone', value)}
                    />
                    <TextInput
                        value={email.value}
                        placeholder="Email"
                        style={_styles.textInput}
                        error={email.errorMessage}
                        wrapperStyle={_styles.textInputWrapper}
                        onChangeText={(value) => this.setFields('email', value)}
                    />
                    <TextInput
                        value={address.value}
                        placeholder="Address"
                        style={_styles.textInput}
                        error={address.errorMessage}
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
                            <Text style={{}}>Male</Text>
                            <RadioButton
                                checkboxColor="silver"
                                onPress={() => this.setFields('gender', 'male')}
                                selected={gender.value === 'male'}
                            />
                            <Text style={{}}>Female</Text>
                            <RadioButton
                                checkboxColor="silver"
                                onPress={() => this.setFields('gender', 'female')}
                                selected={gender.value === 'female'}
                            />
                        </View>
                        
                    </View>

                        <View style={{marginTop: 20,flexDirection  : 'row',justifyContent:'space-between'}}>
                            <Button
                                title="SAVE"
                                onPress={this.onSubmit}
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
                                onPress={() => this.setState({...this.getInitialState()})}
                                style={{
                                    backgroundColor : 'gray',
                                    width : '47%',
                                    borderRadius : 3,
                                    padding : 10,
                                }}
                                titleStyle={{textAlign : 'center',color : colors.fontColor}}
                            />
                        </View>
                </ScrollView>
            </View>
        )
    }
}
const mapStateToProps = store => ({
    user : getUser(store),
});
const mapDispatchToProps = dispatch => ({
    updateUser : (params) => dispatch(UserService.updateUser(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResponderProfile);
