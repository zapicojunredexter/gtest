import React from 'react';
import { connect } from 'react-redux';
import Foundation from 'react-native-vector-icons/Foundation';
import firebase from 'react-native-firebase';
import { Image, StyleSheet, View, Text, Button, TextInput, ToastAndroid } from 'react-native';
import UserService from '../../../services/user.service';
import AuthService from '../../../services/auth.service';

const styles = StyleSheet.create({
    componentRow : {
        flexDirection : 'row',
        alignItems : 'center'
    },
    componentRowLabel : {
        flex : 2,
    },
    componentRowComponent : {
        flex : 3,
    }
});

class Container extends React.PureComponent<> {
    static navigationOptions = {
        headerTitle : 'PROFILE',
    };

    constructor(props) {
        super(props);
        this.state = {
            Id : '',
            FirstName : '',
            LastName: '',
            BirthDate : '',
            Gender : '',
            ContactNumber : '',
            ProfilePictures : [],
            ...props.user,
        };
    }

    render() {
        const { user } = this.props;
        const {
            Id,
            FirstName,
            LastName,
            BirthDate,
            Gender,
            ContactNumber,
            ProfilePictures
        } = this.state;
        const isCommuter = true;

        return (
            <View style={{flex : 1, justifyContent: 'center', padding: 20}}>
                <View style={{alignItems:'center',justifyContent: 'center'}}> 
                    <View
                        style={{
                            backgroundColor: '#0B5173',
                            height: 80,
                            width: 80,
                            borderRadius:40,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Foundation
                            name={user.Gender === 'female' ? 'torso-female' : 'torso'}
                            size={70}
                            color="#fff"
                        />
                    </View>
                </View>
                <View style={styles.componentRow}>
                    <Text style={styles.componentRowLabel}>
                        Name
                    </Text>
                    <TextInput
                        editable={false}
                        value={`${FirstName} ${LastName}`}
                        style={styles.componentRowComponent}
                    />
                </View>
                <View style={styles.componentRow}>
                    <Text style={styles.componentRowLabel}>
                        Birth Date
                    </Text>
                    <TextInput
                        editable={false}
                        value={BirthDate}
                        style={styles.componentRowComponent}
                    />
                </View>
                <View style={styles.componentRow}>
                    <Text style={styles.componentRowLabel}>
                        Gender
                    </Text>
                    <TextInput
                        editable={false}
                        value={Gender}
                        style={styles.componentRowComponent}
                    />
                </View>
                <View style={styles.componentRow}>
                    <Text style={styles.componentRowLabel}>
                        Contact Number
                    </Text>
                    <TextInput
                        value={ContactNumber}
                        onChangeText={text => this.setState({ContactNumber:text})}
                        style={styles.componentRowComponent}
                    />
                </View>
                <Button
                    onPress={() => {
                        this.props.updateContactNumberber(ContactNumber)
                            .then(() => {
                                ToastAndroid.show('Contact Number Updated', ToastAndroid.SHORT);
                            })
                            .catch(error => {
                                ToastAndroid.show(error.message, ToastAndroid.SHORT);
                            });
                    }}
                    style={{width:'100%'}}
                    title="EDIT"
                />
            </View>
        );
    }
}


const mapStateToProps = store => ({
    user : store.user
});
const mapDispatchToProps = dispatch => ({
    updateContactNumberber : contNum => dispatch(UserService.updateContactNumber(contNum)),
    logout : () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);