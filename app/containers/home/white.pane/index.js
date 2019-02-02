import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Image,
    Slider,
    StyleSheet,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import SendSMS from 'react-native-sms-x';
import { Map } from 'react-native-openanything';
import { colors } from '../../../constants/colors';
import TextInput from '../../../components/text.input';
import HeaderRight from '../../../components/header/header.right';
import HeaderLeft from '../../../components/header/header.left';
import Button from '../../../components/button';
import WebView from '../../../components/webview';
import RadioButton from '../../../components/radio.button';
import { getUser } from '../../../selectors/user.selector';
import { getFavContacts } from '../../../selectors/contacts.selector';
import { getEdmPreferred, getTemplateMessage } from '../../../selectors/white.pane.selector';
import WhitePaneActions from '../../../reducers/white.pane/white.pane.action';

type Props = {
};


const _styles = (userType = 'seculacer') => StyleSheet.create({
    digitPassCodeContainer : {
        marginTop : 70,
        marginLeft : 20,
        marginRight : 20,
        padding : 10,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : colors.fieldSetBg,
    },
    digitPassCodeTitle : {
        color : 'orange',
        fontSize : 20,
    },
    txtFieldCode : {
        textAlign : 'center',
        fontSize : 30,
        height : 100,
        color : 'black',
    },
    mainContainer : {
        flex : 1,
    },
    headerTop : {
        backgroundColor : 'orange',
        height : 130,
    },
    headerComponentsWrapper : {
        flex : 1,
        margin : 30,
    },
    edmWrapper : {
        margin : 20,
    },
    edmHeaderTitle : {
        fontSize : 17,
        color : colors.error,
        textAlign : 'center',
    },
    edmTextBox : {
        borderColor : colors.error,
        borderWidth : 1,
        borderRadius : 3,
        backgroundColor : colors.fieldSetBg,
        padding : 5,
        marginTop : 10,
        marginBottom : 10,
        color : 'black',
    },
    edmButton : {
        backgroundColor : colors.responder.mainHeader,
        width : '70%',
        borderRadius : 3,
        alignSelf : 'center',
        padding : 5,
        margin : 10,
    },
    edmButtonTitle : {
        textAlign : 'center',
        color : colors.fontColor,
    },
});

class WhitePane extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['seculacer'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
    }
    // static navigationOptions = ({ navigation }) => {
    //     const colorSets = colors[navigation.state.params && navigation.state.params.user.type || 'seculacer'];
    //     return ({
    //         title : 'WHITE PANE',
    //         headerTitleStyle : {
    //             color : colors.fontColor,
    //         },
    //         headerStyle : {
    //             backgroundColor : colorSets && colorSets.mainHeader,
    //         },
    //         headerRight : <HeaderRight />,
    //         headerLeft : <HeaderLeft />
    //     });
    // };

    constructor(props) {
        super(props);
        this.state = {
            isMapShown : true,
            templateMessage : props.templateMessage,
            currentLocation:{
                latitude: 10.2997468,
                longitude: 123.9031766,
            }
        };
        setInterval(() => this.setState({
            currentLocation:{
                latitude: this.state.currentLocation.latitude + 0.0001,
                longitude: this.state.currentLocation.longitude + 0.0001,
            }
        }), 1000);

        // const { navigation } = props;
        // navigation.setParams({ user : { ...props.user }});
        // Map([10.30963,123.90400]);
    }

    onPressEmergencySend = async () => {
        const { edmPreferred, favContacts, templateMessage } = this.props;
        const array = favContacts.map(contact => contact.contactNum);
        
        if(edmPreferred === 'contacts'){
            if(favContacts.length > 0){        
                array.forEach((arr,index) => {
                    SendSMS.send(
                        index,
                        arr,
                        templateMessage,
                        (msg) => alert('Messsages have been sent')
                    );
                });
            }else{
                alert('No contacts have been set')
            }
        }
        if(edmPreferred === 'responders'){
            alert('TODO : SEND MESSAGE EDM RESPONDER');
        }
        // 09672046590 ekong
        // 

    }

    onTriggerCall = () => {
        // RNImmediatePhoneCall.immediatePhoneCall('09672046590');
        const { edmPreferred, favContacts } = this.props;
        if(edmPreferred === 'contacts'){
            if(favContacts.length > 0){
                const callNumber = favContacts[0].contactNum;
                RNImmediatePhoneCall.immediatePhoneCall(callNumber);
            }else{
                alert('No contacts have been set')
            }
        }
        if(edmPreferred === 'responders'){
            alert('TODO : CALL EDM RESPONDER');
        }
    }

    renderEnterPassCode = () => {
        const styles = _styles();
        return (
            <View style={styles.digitPassCodeContainer}>
                <Text style={styles.digitPassCodeTitle}>ENTER 4 DIGIT PASS CODE</Text>
                <TextInput placeholder="_ _ _ _" style={styles.txtFieldCode}/>
            </View>
        );
    }

    renderEDMBody = () => {
        const styles = _styles();
        const { edmPreferred, setEDMPreferred, editTemplate } = this.props;
        return (
            <View style={styles.edmWrapper}>
                <Text style={styles.edmHeaderTitle}>Emergency Distress Message</Text>
                <TextInput onChangeText={(value) => this.setState({templateMessage : value})} value={this.state.templateMessage} placeholder="Type message" style={styles.edmTextBox}/>
                <Button style={{marginBottom : 20}} titleStyle={{textAlign : 'right'}} title="Save template" onPress={() => editTemplate(this.state.templateMessage)} />
                <Button onPress={this.onPressEmergencySend} style={styles.edmButton} titleStyle={styles.edmButtonTitle} title="EMERGENCY SEND" />
                <View style={{flexDirection : 'row',alignItems : 'center'}}>
                    <View style={{ flex : 1, height : 3, margin : 5, backgroundColor : 'silver'}}/>
                    <Text style={styles.edmHeaderTitle}>Emergency Distress Message</Text>
                    <View style={{ flex : 1, height : 3, margin : 5, backgroundColor : 'silver'}}/>
                </View>
                <View style={{flexDirection : 'row', justifyContent : 'space-between', width: '80%', alignItems : 'center'}}>
                    <RadioButton onPress={() => setEDMPreferred('responders')} selected={edmPreferred === 'responders'}/>
                    <Text>Watcher</Text>
                    <RadioButton onPress={() => setEDMPreferred('contacts')} selected={edmPreferred === 'contacts'}/>
                    <Text>Contacts</Text>
                </View>
                {/*
                <Slider
                    minimumValue={1}
                    maximumValue={2}
                    step={1}
                    thumbImage={<Image src={require('../../../assets/images/user.png')} />}
                    trackStyle={{
                        height: 20,
                        backgroundColor: '#303030',
                      }}
            thumbStyle={{
                width: 30,
                height: 30,
                backgroundColor: 'rgba(150, 150, 150, 0.3)',
                borderColor: 'rgba(150, 150, 150, 0.6)',
                borderWidth: 14,
                borderRadius: 15,
              }}
            minimumTrackTintColor='#2f2f2f'
                />*/}
                <Button
                    style={{
                        margin : 15,
                        backgroundColor : colors.responder.main,
                        padding : 10,
                        borderRadius : 3,
                    }}
                    titleStyle={{textAlign : 'center',color : colors.fontColor}}
                    title="EMERGENCY CALL"
                    onPress={this.onTriggerCall} />
            </View>
        );
    }

    renderMapBody = () => {
        return (
            <View style={{flex:1, margin : 20 }}>
                {/*
                <WebView
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    source={{uri: 'https://www.google.com/maps/place/Cebu+City,+Cebu/@10.3901115,123.75039,11.44z/data=!4m5!3m4!1s0x33a999258dcd2dfd:0x4c34030cdbd33507!8m2!3d10.3156992!4d123.8854366'}}
                    style={{flex : 1,margin : 15}}
                />
                */}

                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={{
                        ...StyleSheet.absoluteFillObject,
                    }}
                    initialRegion={{
                        latitude: 10.2997468,
                        longitude: 123.9031766,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                    moveOnMarkerPress={false}
                    showsUserLocation
                    showsPointsOfInterest={false}
                    followsUserLocation={true}   
                    showsUserLocation       
                >
                <Marker.Animated
                    coordinate={this.state.currentLocation}
                    title={"title"}
                    description={"descr"}
                    identifier={"123"}
                    key={"123"}
                />
                </MapView>
            </View>
        );
    }

    render() {
        const isPassCoded = true;
        const styles = _styles();
        const { isMapShown } = this.state;

        if( !isPassCoded ) {
            return this.renderEnterPassCode();
        }
        return (
            <View style={styles.mainContainer}>
                <View style={styles.headerTop}>
                    <Image
                        style={{
                            flex: 1,
                            resizeMode : 'cover',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                        }}
                        source={require('../../../assets/images/googlemapsbg.jpg')}
                    />
                    <View style={styles.headerComponentsWrapper}>
                        <TextInput placeholder="LOCATION" style={{backgroundColor : 'rgba(122, 122, 214, 0.5)'}}/>
                        <Button onPress={() => this.setState({isMapShown : !isMapShown})}><Text style={{textAlign : 'right'}}>Toggle map</Text></Button>
                    </View>
                </View>
                { isMapShown ? this.renderEDMBody() : this.renderMapBody() }
            </View>
        );
    }
}
const mapStateToProps = store => ({
    user : getUser(store),
    favContacts : getFavContacts(store),
    edmPreferred : getEdmPreferred(store),
    templateMessage : getTemplateMessage(store),
});
const mapDispatchToProps = dispatch => ({
    setEDMPreferred : edmPreferred => dispatch(WhitePaneActions.setEdmPreferred(edmPreferred)),
    editTemplate : templateMessage => dispatch(WhitePaneActions.setTemplateMessage(templateMessage)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WhitePane);
