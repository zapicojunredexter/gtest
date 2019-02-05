import ResponderLocationAction from '../reducers/responder.locations/responder.locations.action';

class ResponderLocationsService {
    fetchLocations = () => (dispatch) => {
        const seculacersList = [
            {
                location:{
                    latitude: 10.2997468,
                    longitude: 123.9031766,
                }
            },
            {
                location:{
                    latitude: 10.2997468+0.0003,
                    longitude: 123.9031766+0.0003,
                }
            }
        ];
        dispatch(ResponderLocationAction.setSeculacersList(seculacersList));
    };

}

export default new ResponderLocationsService();
