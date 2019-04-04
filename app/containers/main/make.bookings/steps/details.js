import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Picker from '../../../../components/picker';
import DatePicker from '../../../../components/date.picker';
class Container extends React.PureComponent<> {
    // static navigationOptions = (({ navigation, screenProps }) => ({
    //     headerLeft : (
    //         <TouchableOpacity onPress={() => navigation.goBack()}>
    //             <Text>back</Text>
    //         </TouchableOpacity>
            
    //     ),
    // }));

    constructor(props) {
        super(props);
    }

    render() {
        const { goToNext } = this.props;
        return (
            <View style={{backgroundColor:'orange',margin: 20,flex:1}}>
                <View style={{flex:1}}>
                    <Text>IN DETAILSii</Text>

                    <View style={{flexDirection:'row'}}>

                        <Text style={{flex:1}}>Time</Text>
                        <Picker
                            style={{flex:1,backgroundColor : 'orange'}}
                            numberOfLines={1}
                            choices={[123,1234,12345]}
                            selectedValue={1234}
                            onSelect={this.selectFrom}
                        />
                    </View>

                    <View style={{flexDirection:'row'}}>

                        <Text style={{flex:1}}>Time</Text>
                        <Picker
                            style={{flex:1,backgroundColor : 'orange'}}
                            numberOfLines={1}
                            choices={[123,1234,12345]}
                            selectedValue={1234}
                            onSelect={this.selectFrom}
                        />
                    </View>
                    <DatePicker placeholder="Pick date"/>
                </View>
                <Button
                    title="NEXT"
                    onPress={goToNext}
                />
            </View>
        );
    }
}

export default Container;