import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import Picker from '../../../components/picker';
import DatePicker from '../../../components/date.picker';
import Steps from './make.bookings.step';
import ScheduleService from '../../../services/schedules.service';
import TerminalsService from '../../../services/terminals.service';
import RoutesService from '../../../services/routes.service';
import TripsService from '../../../services/trips.service';
import BookingsService from '../../../services/bookings.service';
import ConfirmBooking from './confirm.booking';
import SystemRestricted from '../../../utils/system.restrction';
import NotificationService from '../../../services/notifications.service';
import { getTravellingBooking } from '../../../selectors/bookings.selector';
import Pathing from '../../../components/map.view/pathing';

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    componentRow : {
        flexDirection : 'row',
        margin : 15
    },
    componentLabel : {
        flex : 1,
        fontSize : 16,
        fontWeight : 'bold'
    },
    componentPicker : {
        flex : 1,
        fontSize : 16,
    },
    flatListWrapper : {
        flex : 1,
        padding : 10,
    },
    scrollerContainer : {
    },

    tripRowContainer : {
        borderRadius : 3,
        borderColor : 'silver',
        borderWidth : 1,
        marginBottom : 5,
        padding : 15,
    },
    tripRowComponentPair : {
        flexDirection : 'row',
    },
    tripRowComponentPairLabel : {
        fontWeight : 'bold',
        fontSize : 12,
    },
    tripRowComponentPairValue : {
        fontSize : 12,
        marginLeft : 10,
    },
    tripRowSelected : {
        backgroundColor : '#87ceeb'
    }
});

class Container extends React.PureComponent<> {

    static navigationOptions = {
        headerTitle : 'BOOK TRIP',
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedRouteId : null,
            selectedScheduleId : null,
            selectedDate : null,
            selectedTrip : null,
            availableDates: [],

            isRoutesFetching: true,
            isSchedulesFetching: false,
        };
    }

    componentDidMount() {
        this.snapData();
    }

    snapData = async () => {
        await this.props.fetchRoutes();

        this.setState({
            isRoutesFetching: false,
        })
        // this.props.listenSchedules();
        // this.props.listenRoutes();
    }

    handleAddBooking = (additionalData) => {
        const { addBooking } = this.props;
        const { selectedRouteId, selectedScheduleId, selectedTrip } = this.state;

        const bookingData = {
            ...additionalData,
            // RouteId : selectedRouteId,
            TripId : selectedTrip.Id,  
        };

        const {
            DepartDate,
            DepartTime
        } = selectedTrip.Schedule;
        addBooking(bookingData)
            .then(() => {
                
                ToastAndroid.show("Added new Booking",ToastAndroid.SHORT);
                this.setState({selectedTrip : null});

                const notifDate = new Date(`${DepartDate} ${DepartTime}`);
                notifDate.setMinutes(notifDate.getMinutes() - 15);
                NotificationService.createLocalNotification('Upcoming Trip', 'A trip you booked will be departing in 15 minutes', notifDate);
            })
            .catch(error => {
                alert(error.message);
                this.setState({selectedTrip : null});
            });

    }

    renderTripRow = ({item}) => {
        const { selectedTrip } = this.state;
        const isTravelling = item.Status === "Travelling";
        const renderTripRecord = (label, value) => (
            <View style={styles.tripRowComponentPair}>
                <Text style={styles.tripRowComponentPairLabel}>{label || '-'}</Text>
                <Text style={styles.tripRowComponentPairValue}>{value || '-'}</Text>
            </View>
        );
        const seatsValuesArray = item.Vehicle && Object.values(item.Vehicle.SeatsStatus) || [];
        return (
            <TouchableOpacity
                disabled={isTravelling}
                onPress={() => this.setState({selectedTrip : item})}
                style={[
                    styles.tripRowContainer,
                    isTravelling && styles.tripRowSelected
                ]}
            >
                {renderTripRecord('Driver Name',item.Driver && `${item.Driver.FirstName} ${item.Driver.LastName}`)}
                {renderTripRecord('Plate Number',item.Vehicle && item.Vehicle.PlateNumber)}
                {renderTripRecord('Commuter Count', `${seatsValuesArray.filter(seat => seat).length} / ${seatsValuesArray.length}`)}
                {renderTripRecord('Departure Time', `${item.Schedule && `${item.Schedule.DepartDate} ${item.Schedule.DepartTime}`}`)}
                {renderTripRecord('Status',item.Status)}
            </TouchableOpacity>
        );
    }

    render() {
        const { routes, schedules, trips, travellingBooking } = this.props;
        const { selectedRouteId, selectedScheduleId, selectedTrip, selectedDate } = this.state;
        
        const selectedRoute  = routes.find(route => route.Id === selectedRouteId);
        // if(false){
        if(!!travellingBooking){
            return(
                <View style={[styles.container]}>
                    <Pathing route={travellingBooking.Trip.Route} />
                    <View style={{
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: 'center',
                        position: 'absolute'
                    }}>
                        <View style={{opacity: 0.9, margin: 30,padding: 10, borderRadius: 4, backgroundColor: 'white'}}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Currently on Trip en route
                                {` ${travellingBooking && travellingBooking.Trip && travellingBooking.Trip.Route.Route}`}
                            </Text>
                        </View>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ConfirmBooking
                    modalProps={{
                        isVisible : !!selectedTrip,
                        // isVisible: true,
                        onBackdropPress : () => this.setState({selectedTrip : null})
                    }}
                    route={selectedRoute}
                    selectedTrip={this.state.selectedTrip}
                    // schedule={selectedSchedule}
                    onPressConfirm={this.handleAddBooking}
                />
                <View style={styles.componentRow}>
                    <Text style={styles.componentLabel}>
                        ROUTE
                    </Text>
                    <Picker
                        style={styles.componentPicker}
                        numberOfLines={1}
                        choices={routes.map(route => route.Route)}
                        selectedValue={this.state.isRoutesFetching ? 'Fetching...' : (selectedRoute && selectedRoute.Route || "-")}
                        onSelect={(it) => alert(JSON.stringify(it))}
                        onSelect={(data) => {
                            const selected = routes.find(route => route.Route === data);
                            if(selected){
                                // this.props.listenTrips(null);
                                
                                this.setState({
                                    selectedRouteId: selected.Id,
                                    availableDates: [],
                                    selectedDate : null,
                                    isSchedulesFetching: true,
                                })
                                this.props.listenTrips('', selected.Id);

                                this.props.fetchRouteScheduleDates(selected.Id).then(result => {
                                    this.setState({
                                        availableDates: result,
                                        isSchedulesFetching: false,
                                    });
                                });;
                                
                            } else {
                                alert("value does not exists in choices");
                            }
                        }}
                    />
                </View>
                <View style={styles.componentRow}>
                    <Text style={styles.componentLabel}>
                        DATE
                    </Text>
                    <Picker
                        style={styles.componentPicker}
                        numberOfLines={1}
                        choices={this.state.availableDates}
                        selectedValue={this.state.isSchedulesFetching ? 'Fetching...' : (selectedDate || "-")}
                        onSelect={(data) => {
                            this.setState({selectedDate : data});
                            this.props.listenTrips(data, this.state.selectedRouteId);
                        }}
                    />
                    {/*
                    <DatePicker
                        wrapperStyle={styles.componentPicker}
                        placeholder="-"
                        value={selectedDate}
                        onValueChange={(value) => {
                            this.setState({selectedDate : value});
                            this.props.listenTrips(value);
                        }}
                    />
                    */}
                </View>
                {/* 
                <View style={styles.componentRow}>
                    <Text style={styles.componentLabel}>
                        SCHEDULE
                    </Text>
                    <Picker
                        style={styles.componentPicker}
                        numberOfLines={1}
                        choices={filteredSchedules.map(schedule => schedule.DepartureTime)}
                        selectedValue={(selectedSchedule && selectedSchedule.DepartureTime || "-")}
                        onSelect={(data) => {
                            const selected = filteredSchedules.find(sched => sched.DepartureTime === data);
                            if(selected){
                                this.setState({selectedScheduleId: selected.Id});
                                this.props.listenTrips(selected.Id);
                            } else {
                                alert("value does not exists in choiceshjjhjh");
                            }
                        }}
                    />
                </View>
                */}
                <View style={styles.flatListWrapper}>
                    <FlatList
                        contentContainerStyle={styles.scrollerContainer}
                        data={this.state.selectedDate ? trips : []}
                        renderItem={this.renderTripRow}
                        // extraData={this.state.selectedTrip}
                        // onRefresh={this.snapData}
                        // refreshing={false}
                    />
                    {/*
                    */}
                </View>
            </View>
        );
        return (
            <View style={{flex:1}}>
                <Text>IN CONTAINER</Text>
                <Steps {...this.props} />
            </View>
        );
    }
}

Container.defaultProps = {
    schedules : [],
    routes : [],
};

const mapStateToProps = store => ({
    schedules : store.schedules.schedules,
    routes : store.routes,
    trips : store.trips.trips,
    travellingBooking : getTravellingBooking(store),
});
const mapDispatchToProps = dispatch => ({
    // setHasInternetConnection : () => dispatch(SystemActions.setHasInternet(true)),
    // listenSchedules : () => dispatch(ScheduleService.listenSchedules()),
    // listenRoutes : () => dispatch(RoutesService.listenRoutes()),
    fetchRoutes: () => dispatch(RoutesService.fetchRoutes()),
    listenTrips : (schedDate,routeId) => dispatch(TripsService.listenTrips(schedDate,routeId)),
    addBooking : booking => dispatch(BookingsService.addBooking(booking)),
    fetchRouteScheduleDates: (routeId) => dispatch(RoutesService.fetchRouteScheduleDates(routeId))
});

export default SystemRestricted(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container),
{
    disableCheckLocation : true,

    navigationOptions: {
        headerTitle : 'BOOK TRIP',
    }

});