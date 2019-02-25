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


    submitEDM = (params) => async (dispatch, getState) => {
        const state = getState();
        const { api } = state.system;
        const formData = new FormData();
        
        formData.append('sec_id', params['sec_id'] || '');
        formData.append('res_id', params['res_id'] || '');
        formData.append('guardian_id', params['guardian_id'] || '');
        formData.append('edm_date_time', params['edm_date_time'] || '');
        formData.append('edm_content', params['edm_content'] || '');
        
        formData.append('edm_loc', params['edm_loc'] || '');
        formData.append('edm_stat', params['edm_stat'] || '');

        const response = await fetch(`${api}/addEdms.php`,{
            method : 'post',
            body : formData,
        }).catch(error => { throw error});
        const responseText = await response.text().catch(error => { throw error });
        
        try {
            const data = JSON.parse(responseText);
            console.log('HOY',data);
            
            if(data.Message) { return Promise.reject(new Error(data.Message)) }
            return Promise.resolve(data);
        } catch(err) {
            throw new Error('Invalid response format');
        }
    }

}

export default new WhitePaneService();
