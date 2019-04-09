import React from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, View, Text, Button, TextInput } from 'react-native';
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
            Name : '',
            BirthDate : '',
            Gender : '',
            ContactNumber : '',
            ProfilePictures : [],
        }
    }

    setUserPropsToState = () => {
        const { user } = this.props;

        this.setState({
            ...user
        });
    }

    render() {
        const { user } = this.props;
        const {
            Id,
            Name,
            BirthDate,
            Gender,
            ContactNumber,
            ProfilePictures
        } = this.state;
        const isCommuter = true;
        return (
            <View style={{flex : 1, justifyContent : 'center', alignItems : 'center'}}>
                <Text>{JSON.stringify(user)}</Text>
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
                <View style={styles.componentRow}>
                    <Text style={styles.componentRowLabel}>
                        Name
                    </Text>
                    <TextInput
                        editable={false}
                        value="zxczx"
                        style={styles.componentRowComponent}
                    />
                </View>
                <View style={styles.componentRow}>
                    <Text style={styles.componentRowLabel}>
                        Birth Date
                    </Text>
                    <TextInput
                        editable={false}
                        value="zxczx"
                        style={styles.componentRowComponent}
                    />
                </View>
                <View style={styles.componentRow}>
                    <Text style={styles.componentRowLabel}>
                        Gender
                    </Text>
                    <TextInput
                        editable={false}
                        value="zxczx"
                        style={styles.componentRowComponent}
                    />
                </View>
                <View style={styles.componentRow}>
                    <Text style={styles.componentRowLabel}>
                        Contact Number
                    </Text>
                    <TextInput
                        value="zxczx"
                        style={styles.componentRowComponent}
                    />
                </View>
                <Button
                    onPress={async () => {
                        await this.props.logout();
                        this.props.navigation.navigate('Login');
                    }}
                    title="LOGOUT"
                />
            </View>
        );
    }
}


const mapStateToProps = store => ({
    user : store.user
});
const mapDispatchToProps = dispatch => ({
    login : (username, password) => dispatch(AuthService.login(username, password)),
    logout : () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);