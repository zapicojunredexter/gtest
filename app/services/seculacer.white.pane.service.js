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

}

export default new WhitePaneService();
