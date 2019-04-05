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
        return (
            <View style={{flex:1}}>
                <Text>IN CONTAINER</Text>
                <Steps {...this.props} />
            </View>
        );
    }
}

Container.defaultProps = {
    // terminals : [],
    // schedules : [],
};

const mapStateToProps = store => ({
    // terminals : store.terminals,
    // schedules : store.schedules.schedules
});
const mapDispatchToProps = dispatch => ({
    // setHasInternetConnection : () => dispatch(SystemActions.setHasInternet(true)),
    listenSchedules : () => dispatch(ScheduleService.listenSchedules()),
    listenTerminals : () => dispatch(TerminalsService.listenTerminals()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);