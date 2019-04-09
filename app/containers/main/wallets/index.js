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
    },
    cardContainer : {
        flexDirection : 'row',
        padding : 10,
        margin : 10,
        borderRadius : 3,
        borderWidth : 1,
        borderColor : 'silver'
    },
    cardIcon : {
        width: 50,
        height: 50,
        marginRight : 10,
    },
    cardContents : {
        flex : 1,
    },
    cardLabel : {
        fontSize : 12,
    },
    cardData : {
        fontSize : 16,
        fontWeight : 'bold',
    }
});

class Container extends React.PureComponent<> {
    static navigationOptions = {
        headerTitle : 'WALLET',
    };

    render() {
        const { user } = this.props;

        return (
            <View style={{flex : 1, alignItems : 'center'}}>
                <View style={styles.cardContainer}>
                    <Image
                        style={styles.cardIcon}
                        source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                    />
                    <View style={styles.cardContents}>
                        <Text style={styles.cardLabel}>
                            asdasda
                        </Text>
                        <Text style={styles.cardData}>
                            asdasda
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}


const mapStateToProps = store => ({
    user : store.user
});
const mapDispatchToProps = dispatch => ({
    // login : (username, password) => dispatch(AuthService.login(username, password)),
    // logout : () => dispatch(AuthService.logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);