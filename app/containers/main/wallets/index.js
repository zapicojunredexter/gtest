import React from 'react';
import { connect } from 'react-redux';
import { Image, StyleSheet, View, Text, Button, FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import WalletsService from '../../../services/wallets.service';

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
    },
    listContainer : {
        flex : 1,
    },

    listItemWrapper: {
        padding: 5,
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
        headerTitle : 'WALLET',
    };

    state = {
        fetching : false,
    }

    componentDidMount() {
        this.fetchWalletsHistory()
    }

    fetchWalletsHistory = async () => {
        const { fetchWalletsHistory } = this.props;
        this.setState({fetching : true});

        await fetchWalletsHistory();

        this.setState({fetching : false});

    }

    renderItemList = ({item, index}) => {
        return (
            <View style={[styles.listItemWrapper,index%2===0 && styles.isEventRow]} key={index}>  
                <Text style={styles.listItem}>
                    {item.Amount} points loaded {item.createAt}
                </Text>
            </View>
        );
    }

    renderBookingHisotrySpent = ({item, index}) => {
        return (
            <View style={[styles.listItemWrapper,index%2===0 && styles.isEventRow]} key={index}>  
                <Text style={styles.listItem}>
                    {item.label}
                </Text>
            </View>
        );
    }

    render() {
        const { user, walletHistory } = this.props;
        const { fetching } = this.state;
        const mappedBookings = this.props.bookings.map(booking => {
            return {
                ...booking,
                label: `Booked trip for ${(booking.Trip && booking.Trip.Route && booking.Trip.Route.Route) || '-'} for PHP${booking.AmtPaid}`
            };
        });

        return (
            <View style={{flex : 1}}>
                <View style={styles.cardContainer}>
                    <Entypo name="wallet" size={50} color="black" style={styles.cardIcon} />
                    <View style={styles.cardContents}>
                        <Text style={styles.cardLabel}>
                            {Number(user.WalletBalance).toFixed(2)}
                        </Text>
                        <Text style={styles.cardData}>
                            Cash balance
                        </Text>
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <Text style={{backgroundColor: 'silver', padding: 15,fontWeight: 'bold',fontSize: 14}}>WALLET HISTORY</Text>
                    <FlatList
                        data={walletHistory}
                        refreshing={fetching}
                        onRefresh={this.fetchWalletsHistory}
                        renderItem={this.renderItemList}
                    />
                </View>
                <View style={styles.listContainer}>
                    <Text style={{backgroundColor: 'silver', padding: 15,fontWeight: 'bold',fontSize: 14}}>TRANSACTION HISTORY</Text>
                    <FlatList
                        data={mappedBookings}
                        // refreshing={fetching}
                        // onRefresh={this.fetchWalletsHistory}
                        renderItem={this.renderBookingHisotrySpent}
                        // ListHeaderComponent={}
                    />
                </View>
            </View>
        );
    }
}


const mapStateToProps = store => ({
    user : store.user,
    walletHistory : store.wallets.walletHistory,
    bookings: store.bookings.userBookings,
});
const mapDispatchToProps = dispatch => ({
    fetchWalletsHistory : () => dispatch(WalletsService.fetchWalletsHistory())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);