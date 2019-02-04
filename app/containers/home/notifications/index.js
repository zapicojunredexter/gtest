import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    FlatList,
    CheckBox,
    TouchableOpacity,
    Image
} from 'react-native';
import { colors } from '../../../constants/colors';

type Props = {
};


class Notifications extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['seculacer'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            isDeleting : false,
        }
    }

    renderNotificationRow = ({item, index}) => {
        const { isDeleting } = this.state;
        return (
            <TouchableOpacity
                style={{ 
                    backgroundColor : colors.fieldSetBg,
                    marginTop : 5,
                    marginLeft : 5,
                    marginRight : 5,
                    flexDirection : 'row',
                    alignItems : 'center',
                    justifyContent : 'center'
                }}
                onLongPress={() => this.setState({ isDeleting : !this.state.isDeleting })}
            >
                {isDeleting && <CheckBox />}
                <View style={{flex : 1, padding : 15}}>
                    <Text style={{fontSize : 15}}>{item.title}</Text>
                    <Text>{item.description}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const notifications = [
            {
                title : "sample notification 1",
                description : "sample notification body 1"
            },
            {
                title : "sample notification 2",
                description : "sample notification body 2"
            },
            {
                title : "sample notification 3",
                description : "sample notification body 3"
            },        ];
        return (
            <View style={{flex : 1}}>
                <View style={{flex  : 1}}>
                    <FlatList
                        data={notifications}
                        renderItem={this.renderNotificationRow}
                    />
                </View>
                <View style={{
                    backgorundColor : 'red',
                    height : 50,
                    padding : 10,
                    justifyContent : 'center',
                    alignItems : 'flex-end',
                }}>
                    <Image
                        source={require('../../../assets/images/delete.png')}
                        style={{
                            width : 20,
                            height : 20,
                        }}
                    />
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
)(Notifications);
