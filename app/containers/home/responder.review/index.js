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
import ResponderReviewsService from '../../../services/responder.review.service';

import { getReviews } from '../../../selectors/responder.review.selector';

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

    constructor(props){
        super(props);
        this.state = {
            isFetching : false,
        }
        this.fetchReviews();
    }

    fetchReviews = async () => {
        this.setState({ isFetching : true });
        const { fetchReviews } = this.props;
        await fetchReviews().catch(error => alert(error.message));
        this.setState({ isFetching : false });
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
        const { isFetching } = this.state;
        const { reviews } = this.props;

        return (
            <View>
                <FlatList
                    data={reviews}
                    renderItem={this.renderRow}
                    onRefresh={this.fetchReviews}
                    refreshing={isFetching}
                />
            </View>
        );
    }
}
const mapStateToProps = store => ({
    reviews : getReviews(store),
});
const mapDispatchToProps = dispatch => ({
    fetchReviews : () => dispatch(ResponderReviewsService.fetchReviews())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResponderReview);
