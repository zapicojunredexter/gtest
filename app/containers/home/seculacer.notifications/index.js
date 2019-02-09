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
import { getNotifications } from '../../../selectors/notifications.selector';
import NotificationsService from '../../../services/notifications.service';

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
            isFetching : false,
        }

        this.fetchNotifications();
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

    fetchNotifications = async () => {
        this.setState({ isFetching : true });
        const { fetchNotifications } = this.props;
        await fetchNotifications().catch(error => alert(error.message));
        this.setState({ isFetching : false });
    }

    render() {
        const { isFetching } = this.state;
        const { notifications } = this.props;
        return (
            <View style={{flex : 1}}>
                <View style={{flex  : 1}}>
                    <FlatList
                        data={notifications}
                        renderItem={this.renderNotificationRow}
                        onRefresh={this.fetchNotifications}
                        refreshing={isFetching}
                    />
                </View>
                <View style={{
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
    notifications : getNotifications(store),
});
const mapDispatchToProps = dispatch => ({
    fetchNotifications : () => dispatch(NotificationsService.fetchNotifications()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
