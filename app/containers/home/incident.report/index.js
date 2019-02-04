import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Image,
    TextInput,
    StyleSheet,
    ScrollView
} from 'react-native';
import { colors } from '../../../constants/colors';
import Button from '../../../components/button';

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


class IncidentReport extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['responder'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
    }

    render() {
        const {
            contact,
            email,
            name,
        } = this.props.navigation.state.params;
        const styles = _styles();
        return (
            <View style={{flex : 1,margin : 15}}>
                <Text style={{fontSize : 15, color : colors.responder.mainHeader}}>Incident Report</Text>
                <View style={{flexDirection : 'row'}}>
                    <Image
                        style={{width : 50,height:50}}
                        source={require('../../../assets/images/user.png')}
                    />
                    <ScrollView style={{marginBottom : 20}}>
                        <TextInput style={styles.textInput} placeholder="Victim's Name" />
                        <TextInput style={styles.textInput} placeholder="User ID" />
                        <TextInput style={styles.textInput} placeholder="Report Number" />
                        <TextInput style={styles.textInput} placeholder="Location" />
                        <TextInput style={styles.textInput} placeholder="Time" />
                        <TextInput style={styles.textInput} placeholder="Date" />
                        <TextInput style={styles.textInput} placeholder="Sex" />
                        <TextInput style={styles.textInput} placeholder="Incident Status" />
                        <TextInput style={styles.textInput} placeholder="Incident Description" />
                        <TextInput style={styles.textInput} placeholder="Remarks" />



                        <View style={{flexDirection  : 'row',justifyContent:'space-between'}}>
                            <Button
                                title="SUBMIT"
                                onPress={() => alert("SUBMIT")}
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
                                onPress={() => this.props.navigation.goBack()}
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
                
            </View>
        );
    }
}
const mapStateToProps = store => ({
});
const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(IncidentReport);
