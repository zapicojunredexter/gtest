import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import Picker from '../../../components/picker';
import Steps from './make.bookings.step';
import ScheduleService from '../../../services/schedules.service';
import TerminalsService from '../../../services/terminals.service';
import RoutesService from '../../../services/routes.service';
import TripsService from '../../../services/trips.service';

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
    constructor(props) {
        super(props);
        this.state = {
            selectedRoute : null,
            selectedSchedule : null,
            selectedTrip : null
        };
    }

    componentDidMount() {
        this.snapData();
    }

    snapData = () => {
        this.props.listenSchedules();
        this.props.listenRoutes();
    }

    renderTripRow = ({item}) => {
        const { selectedTrip } = this.state;

        const renderTripRecord = (label, value) => (
            <View style={styles.tripRowComponentPair}>
                <Text style={styles.tripRowComponentPairLabel}>{label || '-'}</Text>
                <Text style={styles.tripRowComponentPairValue}>{value || '-'}</Text>
            </View>
        );
        return (
            <TouchableOpacity
                onPress={() => this.setState({selectedTrip : item})}
                style={[styles.tripRowContainer, selectedTrip && selectedTrip.Id === item.Id && styles.tripRowSelected]}
            >
                {renderTripRecord('Driver Name',item.DriverName)}
                {renderTripRecord('Plate Number',item.VehiclePlateNo)}
                {renderTripRecord('Commuter Count', `${item.CommutersCount} / ${item.CommutersTotal}`)}
                {renderTripRecord('Status',item.Status)}
            </TouchableOpacity>
        );
    }

    render() {
        const { routes, schedules, trips } = this.props;
        const { selectedRoute, selectedSchedule } = this.state;
        const filteredSchedules = selectedRoute ? schedules.filter(schedule => schedule.RouteId === selectedRoute.Id) : [];

        return (
            <View style={styles.container}>
                <View style={styles.componentRow}>
                    <Text style={styles.componentLabel}>
                        ROUTE
                    </Text>
                    <Picker
                        style={styles.componentPicker}
                        numberOfLines={1}
                        choices={routes.map(route => route.Route)}
                        selectedValue={(selectedRoute && selectedRoute.Route || "-")}
                        onSelect={(it) => alert(JSON.stringify(it))}
                        onSelect={(data) => {
                            const selected = routes.find(route => route.Route === data);
                            if(selected){
                                this.setState({selectedRoute: selected, selectedSchedule : null})
                            } else {
                                alert("value does not exists in choiceshjjhjh");
                            }
                        }}
                    />
                </View>
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
                                console.log("HAHA",selected);
                                this.setState({selectedSchedule: selected});
                                this.props.listenTrips(selected.Id);
                            } else {
                                alert("value does not exists in choiceshjjhjh");
                            }
                        }}
                    />
                </View>
                <View style={styles.flatListWrapper}>
                    <FlatList
                        contentContainerStyle={styles.scrollerContainer}
                        data={trips}
                        renderItem={this.renderTripRow}
                        extraData={this.state.selectedTrip}
                        onRefresh={this.snapData}
                        refreshing={false}
                    />
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
    trips : store.trips.trips
});
const mapDispatchToProps = dispatch => ({
    // setHasInternetConnection : () => dispatch(SystemActions.setHasInternet(true)),
    listenSchedules : () => dispatch(ScheduleService.listenSchedules()),
    listenRoutes : () => dispatch(RoutesService.listenRoutes()),
    listenTrips : (schedId) => dispatch(TripsService.listenTrips(schedId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);