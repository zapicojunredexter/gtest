import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Picker from '../../../../components/picker';
import DatePicker from '../../../../components/date.picker';
import ScheduleService from '../../../../services/schedules.service';
import BookingsAction from '../../../../reducers/bookings/booking.action';

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
        this.state = {
            bookingDate : null,
        }
    }

    componentDidMount(){
        // this.props.listenSchedules();
    }

    render() {
        const {
            goToNext,
            selectedSchedule,
            from,
            to,
            date,
            updateMakeBooking
        } = this.props;
        const choices = this.props.schedules.filter(schedule => schedule.DepartFrom === this.props.from.TerminalId);
        return (
            <View style={{backgroundColor:'orange',margin: 20,flex:1}}>
                <View style={{flex:1}}>
                    <Text>IN DETAILSii</Text>

                    <Text style={{}}>FROM : {(from.TerminalAddress)}</Text>
                    <Text style={{}}>TO :{(to.TerminalAddress)}</Text>
                    
                    <View style={{flexDirection:'row'}}>

                        <Text style={{flex:1}}>SELECTED SCHEDULE</Text>
                        <Picker
                            style={{flex:1,backgroundColor : 'orange'}}
                            numberOfLines={1}
                            choices={choices.map(choice => choice.DepartureTime)}
                            selectedValue={selectedSchedule && selectedSchedule.DepartureTime}
                            onSelect={(data) => {
                                const selectedSchedule = choices.find(schedule => schedule.DepartureTime === data);
                                // this.props.listenSchedule(selectedSchedule.ScheduleId);
                            }}
                        />
                    </View>
                    <DatePicker
                        value={date}
                        onValueChange={(value) => updateMakeBooking({date : value})}
                        placeholder="Pick date"
                    />
                </View>
                <Button
                    title="NEXT"
                    onPress={goToNext}
                />
            </View>
        );
    }
}


const mapStateToProps = store => ({
    schedules : store.schedules.schedules,
    selectedSchedule: store.bookings.makeBooking.schedule,
    from : store.bookings.makeBooking.from,
    to : store.bookings.makeBooking.to,
    date : store.bookings.makeBooking.date
    
});
const mapDispatchToProps = dispatch => ({
    // setHasInternetConnection : () => dispatch(SystemActions.setHasInternet(true)),
    // listenSchedules : () => dispatch(ScheduleService.listenSchedules()),
    // listenSchedule : (scheduleId) => dispatch(ScheduleService.listenSchedule(scheduleId)),
    // updateMakeBooking : makeBooking => dispatch(BookingsAction.updateMakeBooking(makeBooking))
    // listenTerminals : () => dispatch(TerminalsService.listenTerminals()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);