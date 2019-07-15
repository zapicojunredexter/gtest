import React from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, View, Text, Button, FlatList } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeedbackService from '../../../services/feedbacks.service';

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
    },
    listContainer : {
        flex : 1,
    },

    listItemWrapper: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    starsWrapper: {
        flexDirection:'row'
    },
    listItem: {
        fontSize: 12,
    },
    isEventRow: {
        backgroundColor: '#e0e0e0'
    }
});

class Container extends React.PureComponent<> {
    static navigationOptions = {
        headerTitle : 'FEEDBACKS',
    };

    state = {
        fetching : false,
        feedbacks: [],
    }

    componentDidMount() {
        this.fetchDriverFeedbacks()
    }

    fetchDriverFeedbacks = async () => {
        const { fetchDriverFeedbacks } = this.props;
        this.setState({fetching : true});

        const result = await fetchDriverFeedbacks(this.props.user.Id);
        if(result.Feedbacks) {
            this.setState({feedbacks: result.Feedbacks, fetching : false});
        } else {
            this.setState({fetching : false});
        }

    }

    renderItemList = ({item, index}) => {
        return (
            <View style={[styles.listItemWrapper,index%2===0 && styles.isEventRow]} key={index}>  
                <View style={styles.starsWrapper}>
                    <FontAwesome name={item.Score >= 1? "star" : "star-o"} size={12} color="black"  />
                    <FontAwesome name={item.Score >= 2? "star" : "star-o"} size={12} color="black"  />
                    <FontAwesome name={item.Score >= 3? "star" : "star-o"} size={12} color="black"  />
                    <FontAwesome name={item.Score >= 4? "star" : "star-o"} size={12} color="black" />
                    <FontAwesome name={item.Score >= 5? "star" : "star-o"} size={12} color="black" />
                </View>
                <Text style={styles.listItem}>
                    {item.Comment}
                </Text>
            </View>
        );
    }

    render() {
        const { user } = this.props;
        const { fetching } = this.state;

        return (
            <View style={{flex : 1}}>
                <View style={styles.cardContainer}>
                    <FontAwesome name="drivers-license" size={50} color="black" style={styles.cardIcon} />
                    <View style={styles.cardContents}>
                        <Text style={styles.cardData}>
                            {`${user.LastName} ${user.LastName}`}
                        </Text>
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={this.state.feedbacks}
                        refreshing={fetching}
                        onRefresh={this.fetchDriverFeedbacks}
                        renderItem={this.renderItemList}
                    />
                </View>
            </View>
        );
    }
}


const mapStateToProps = store => ({
    user : store.user,
});
const mapDispatchToProps = dispatch => ({
    fetchDriverFeedbacks : (driverId) => dispatch(FeedbackService.fetchDriverFeedbacks(driverId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);