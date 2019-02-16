import WhitePaneAction from '../reducers/seculacer.white.pane/seculacer.white.pane.action';

class WhitePaneService {
    setEDMPreferred = (edmPreferred) => dispatch => {
        // TODO send to back end
        dispatch(WhitePaneAction.setEdmPreferred(edmPreferred));
    }

    editTemplate = (templateMessage) => dispatch => {
        // TODO send to back end
        dispatch(WhitePaneAction.setTemplateMessage(templateMessage));
    }
    setUserLocation = (params) => dispatch => {
        // alert(JSON.stringify(params));
        // dispatch(WhitePaneAction.());
    }

    fetchReverseGeocodedAddress = () => async (dispatch, getState) => {
        const { currentLocation } = getState().system;

        const { latitude, longitude } = currentLocation;

        if(isNaN(latitude) || isNaN(longitude)){
            return '...';
        }
        const latlng =`${latitude},${longitude}`;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}&key=AIzaSyBn9yjNnLVZZqe62tVKfoQ3TW4VpBcWaCE`;

        const result = await fetch(url)
            .catch(error => { throw error });
        const res = await result.json();
        if(res.error_message){ return res.error_message };
        return 'SOMEWHERE';
    }

}

export default new WhitePaneService();
