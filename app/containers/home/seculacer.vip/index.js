import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Image,
    Alert,
    FlatList,
    TextInput
} from 'react-native';
import { colors } from '../../../constants/colors';

import Button from '../../../components/button';
import Switch from '../../../components/switch';
import AgencyService from '../../../services/seculacer.agencies.service';
import { getAgencies } from '../../../selectors/seculacer.agency.selector';


type Props = {
};


class VIP extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['seculacer'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
    }

    state = {
        isFetching : false,
        searchFilter : '',
    }

    componentDidMount() {
        this.loadAgencies();
    }

    renderRow = ({item}) => {
        const { user } = this.props;
        return (
            <View
                style={{
                    marginLeft : 5,
                    marginRight : 5,
                    marginTop : 5,
                    flexDirection : 'row',
                }}>
                <View style={{
                    flex : 1,
                    backgroundColor : colors.fieldSetBg,
                    flexDirection : 'row',
                    padding : 10,
                }}>
                    <Image
                        source={require('../../../assets/images/user.png')}
                        style={{
                            width : null,
                            height : 60,
                            alignSelf : 'center',
                            aspectRatio : 1,
                            resizeMode : 'cover',
                        }}
                    />
                    <View style={{                       
                        margin : 10,
                        flex : 1,
                    }}>
                        <Text style={{
                            fontSize : 15,
                            color : colors.responder.mainHeader,
                        }}>
                            {item.name}
                        </Text>
                        <Text style={{color : 'yellow'}}>
                            {'★'.repeat(item.stars)}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    loadAgencies = async () => {
        this.setState({ isFetching : true });
        const { fetchAgencies } = this.props;
        await fetchAgencies().catch(error => alert(error.message));
        this.setState({ isFetching : false });
    }


    render() {
        const { reviews } = this.props;
        const toShow = reviews.filter((review) => {
            const substring = this.state.searchFilter.toLowerCase();
            return (
                review.name.toLowerCase().indexOf(substring) !== -1
            );
        });

        return (
            <View style={{flex:1}}>
                <View style={{flex : 1}}>
                    
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
                    <View style={{flex:1,justifyContent:'center',padding: 20}}>
                        <Text style={{color:colors.seculacer.mainHeader}}>feel safer,</Text>
                        <Text style={{color:colors.seculacer.mainHeader,fontSize : 20}}>Be our VIP!</Text>
                        <Button
                            style={{borderRadius : 3,borderWidth:2,borderColor:colors.seculacer.main,padding :10,width:150,alignItems:'center'}}
                            titleStyle={{color:colors.seculacer.main}}
                            title="How it Works!"
                            onPress={() => {
                                Alert.alert(
                                    'HOW IT WORKS',
                                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac egestas libero, at tincidunt libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque molestie, est id tempor commodo, urna lacus commodo est, at lacinia mauris orci eu purus. Fusce blandit mauris interdum arcu posuere dignissim. Mauris non nunc lobortis, luctus metus efficitur, viverra libero. Mauris mollis sodales cursus. Curabitur felis nisi, auctor non ante imperdiet, facilisis lobortis elit. Proin blandit tempor sem vel pretium. Morbi vehicula vestibulum tortor non varius. Curabitur tempor rhoncus elit, id pretium sem condimentum quis. Quisque maximus semper turpis, a pellentesque elit luctus vitae.',
                                    [
                                        {
                                            text: 'OK',
                                            onPress: () => {},
                                        },
                                    ],
                                    {cancelable: false},
                                );
                            }}
                        />
                    </View>
                    <View style={{flexDirection:'row',padding : 10}}>
                        <View style={{flex:1}}>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{color:colors.seculacer.main,fontSize : 20}}>FOLLOW ME</Text>
                                <Switch />
                            </View>
                            <Text style={{color:colors.seculacer.main}}>Allow agency to tract location</Text>
                        </View>
                        <Text
                            style={{color:'white'}}
                            onPress={() => {
                                Alert.alert(
                                    'Terms & Conditions',
                                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac egestas libero, at tincidunt libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque molestie, est id tempor commodo, urna lacus commodo est, at lacinia mauris orci eu purus. Fusce blandit mauris interdum arcu posuere dignissim. Mauris non nunc lobortis, luctus metus efficitur, viverra libero. Mauris mollis sodales cursus. Curabitur felis nisi, auctor non ante imperdiet, facilisis lobortis elit. Proin blandit tempor sem vel pretium. Morbi vehicula vestibulum tortor non varius. Curabitur tempor rhoncus elit, id pretium sem condimentum quis. Quisque maximus semper turpis, a pellentesque elit luctus vitae.',
                                    [
                                        {
                                            text: 'OK',
                                            onPress: () => {},
                                        },
                                    ],
                                    {cancelable: false},
                                );
                            }}
                        >
                            Terms And Conditions
                        </Text>
                    </View>
                </View>
                <View style={{flex : 1}}>   
                    <TextInput
                        placeholder="Search agency..."
                        value={this.state.searchFilter}
                        onChangeText={(text) => this.setState({searchFilter : text})}
                    />
                    <FlatList
                        data={toShow}
                        renderItem={this.renderRow}
                        onRefresh={this.loadAgencies}
                        refreshing={this.state.isFetching}
                    />
                </View>
            </View>
        );
    }
}
const mapStateToProps = store => ({
    reviews : getAgencies(store),
});
const mapDispatchToProps = dispatch => ({
    fetchAgencies : () => dispatch(AgencyService.fetchAgencies()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VIP);
