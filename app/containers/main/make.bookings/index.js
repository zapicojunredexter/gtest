import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import Steps from './make.bookings.step';
import ScheduleService from '../../../services/schedules.service';
import TerminalsService from '../../../services/terminals.service';

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.listenSchedules();
        this.props.listenTerminals();
    }

    render() {
        console.log("HERE ARE ZE PROPS", this.props);
        return (
            <View style={{flex:1}}>
                <Text>IN CONTAINER</Text>
                <Steps />
            </View>
        );
    }
}

const mapStateToProps = store => ({
    terminals : store.terminals,
    schedules : store.schedules
});
const mapDispatchToProps = dispatch => ({
    setHasInternetConnection : () => dispatch(SystemActions.setHasInternet(true)),
    listenSchedules : () => dispatch(ScheduleService.listenSchedules()),
    listenTerminals : () => dispatch(TerminalsService.listenTerminals()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);