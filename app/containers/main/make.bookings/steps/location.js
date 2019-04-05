import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import {lineString as makeLineString} from '@turf/helpers';
import Picker from '../../../../components/picker';
import MapboxClient from '../../../../utils/mapbox.client';
import ScheduleService from '../../../../services/schedules.service';
import TerminalsService from '../../../../services/terminals.service';
import BookingsAction from '../../../../reducers/bookings/booking.action';

MapboxGL.setAccessToken("pk.eyJ1IjoiemFwaWNvanVucmVkZXh0ZXIiLCJhIjoiY2p0aDlsZHN5MG5xaDN5cDhtbGdrN3hkeSJ9.UOC5ygISBssSgsyXp7rruQ");
// capitol cebu
const DEFAULT_COORDINATES = [123.8907, 10.3168];

const layerStyles = MapboxGL.StyleSheet.create({
    origin: {
      circleRadius: 5,
      circleColor: 'green',
    },
    destination: {
      circleRadius: 5,
      circleColor: 'blue',
    },
    route: {
      lineColor: '#336699',
      lineWidth: 7,
      lineOpacity: 0.84,
    },
    progress: {
      lineColor: '#314ccd',
      lineWidth: 3,
    },
});

class Container extends React.PureComponent<> {
    constructor(props) {
        super(props);
        this.state = {
            route : null,
        }
    }

    async getDirections() {
        const { locations } = this.props;
        const {
            from,
            to
        } = this.props;
        const res = await MapboxClient.getDirections(
            [
            {
                latitude: from.Coordinates[1],
                longitude: from.Coordinates[0],
            },
            {
                latitude: to.Coordinates[1],
                longitude: to.Coordinates[0]
            },
            ],
            {profile: 'walking', geometry: 'polyline'},
        );
        this.setState({
            route: makeLineString(res.entity.routes[0].geometry.coordinates),
        });
    }

    selectFrom = (from) => {
        const { terminals, updateMakeBooking } = this.props;
        const selectedLocation = terminals.find(location => location.TerminalAddress === from);

        if(selectedLocation){
            updateMakeBooking({
                from: selectedLocation,
                to: null
            });
            // this.setState({from : selectedLocation, to : null});
            this.flyToLocation(selectedLocation.Coordinates);
        } else {
            alert("Location does not exist");
        }
    }

    selectTo = (to) => {
        const { terminals, updateMakeBooking } = this.props;
        const selectedLocation = terminals.find(location => location.TerminalAddress === to);
        
        if(selectedLocation){
            updateMakeBooking({
                to: selectedLocation,
            });
            // this.setState({to : selectedLocation});
            this.flyToLocation(selectedLocation.Coordinates);
            this.getDirections();
        } else {
            alert("Location does not exist");
        }
    }

    flyToLocation = coordinates => {
        if(coordinates && coordinates.length === 2){
            this._map.flyTo(coordinates,3000)
        }
    }

    createToChoices = () => {
        const {
            from,
            to
        } = this.props;
        if (!from) {
            return [];
        }
        const schedulesFromTerminal = this.props.schedules.filter(schedule => schedule.DepartFrom === from.TerminalId);
        const scheduleToTerminalKeys = schedulesFromTerminal.map(schedule => schedule.DepartTo);
        const filteredTerminals = this.props.terminals.filter(terminal => scheduleToTerminalKeys.includes(terminal.TerminalId));
        
        return  filteredTerminals;
    }

    handleNext = () => {
        const { goToNext } = this.props;
        const {
            from,
            to
        } = this.props;
        goToNext();
    }


    renderRoute() {
        if (!this.state.route) {
            return null;
        }

        return (
        <MapboxGL.ShapeSource id="routeSource" shape={this.state.route}>
            <MapboxGL.LineLayer
            id="routeFill"
            style={layerStyles.route}
            belowLayerID="originInnerCircle"
            />
        </MapboxGL.ShapeSource>
        );
    }

    render() {
        const { goToNext, locations } = this.props;
        const {
            from,
            to
        } = this.props;
        const fromChoices = this.props.terminals;
        const toChoices = this.createToChoices();
        console.log("ZXCZXCZX", this.props);


        return (
            <View style={{ position: 'relative', flex:1,margin :10 }}>
                <MapboxGL.MapView
                    zoomLevel={13}
                    zoomLevel={17}
                    ref={c => (this._map = c)}
                    style={{flex : 1, margin : 10}}
                    showUserLocation
                    centerCoordinate={DEFAULT_COORDINATES}
                    style={[{ flex: 1, alignSelf: 'stretch' }]}
                    
                />
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        // backgroundColor: 'red'
                    }}>
                    <Button title="CLICK ME" onPress={() => alert('ZXCZX')}/>
                </View>
            </View>
        );

        return (
            <View style={{flex:1,margin:20}}>
                <Text>{this.props.terminals.length} terminals and {this.props.schedules.length} scheduels</Text>
                <Text>IN LOCATION</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{flex: 1}}>FROM</Text>
                    <Picker
                        style={{flex:1,backgroundColor : 'orange'}}
                        numberOfLines={1}
                        choices={fromChoices.map(location => location.TerminalAddress)}
                        selectedValue={from && from.TerminalAddress}
                        onSelect={this.selectFrom}
                    />
                    <Text style={{flex: 1}}>TO</Text>
                    <Picker
                        style={{flex:1,backgroundColor : 'orange'}}
                        numberOfLines={1}
                        choices={toChoices.map(location => location.TerminalAddress)}
                        selectedValue={to && to.TerminalAddress}
                        onSelect={this.selectTo}
                    />
                </View>
                <MapboxGL.MapView
                    zoomLevel={13}
                    zoomLevel={17}
                    ref={c => (this._map = c)}
                    style={{flex : 1, margin : 10}}
                    showUserLocation
                    centerCoordinate={DEFAULT_COORDINATES}
                >
                    {this.renderRoute()}
                </MapboxGL.MapView>
                <Button
                    title="NEXT"
                    onPress={this.handleNext}
                />
            </View>
        );
    }
}

Container.defaultProps = {
    /*
    locations : [
        {
            id : 'CAPITOL',
            TerminalAddress : 'CAPITOL',
            Coordinates : [123.8907, 10.3168],
            dropoffPoints : ['FORT SAN PEDRO','CEBU BUSINESS PARK'],
        },
        {
            id : 'FORT SAN PEDRO',
            TerminalAddress : 'FORT SAN PEDRO',
            Coordinates : [123.9056,10.2925],
            dropoffPoints : ['CAPITOL','CEBU BUSINESS PARK'],
        },
        {
            id : 'CEBU BUSINESS PARK',
            TerminalAddress : 'CEBU BUSINESS PARK',
            Coordinates : [123.9060,10.3174],
            dropoffPoints : ['CAPITOL','FORT SAN PEDRO'],
        },
    ],
    */
}

const mapStateToProps = store => ({
    terminals : store.terminals,
    schedules : store.schedules.schedules,
    from : store.bookings.makeBooking.from,
    to : store.bookings.makeBooking.to
});
const mapDispatchToProps = dispatch => ({
    updateMakeBooking : makeBooking => dispatch(BookingsAction.updateMakeBooking(makeBooking))
    // listenSchedules : () => dispatch(ScheduleService.listenSchedules()),
    // listenTerminals : () => dispatch(TerminalsService.listenTerminals()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
