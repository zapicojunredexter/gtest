import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import { colors } from '../../../constants/colors';

type Props = {
};


class ResponderReview extends React.PureComponent<Props> {
    static navigationOptions = ({ navigation }) => {
        const colorSets = colors['responder'];
        return ({
            headerStyle : {
                backgroundColor : colorSets && colorSets.mainHeader,
            },
        });
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
                            {item.description}
                        </Text>
                        <Text style={{color : 'yellow'}}>
                            {'★'.repeat(item.stars)}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    render() {
        const sampleData = [
            {
                description : 'sample description',
                stars : 2,
            },
            {
                description : 'sample description',
                stars : 4,
            },
            {
                description : 'sample description',
                stars : 5,
            },
        ];

        return (
            <View>
                <FlatList
                    data={sampleData}
                    renderItem={this.renderRow}
                />
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
)(ResponderReview);
