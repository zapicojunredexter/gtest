import ResponderWatchlistAction from '../reducers/responder.watchlist/responder.watchlist.action';

class ResponderWatchlistService {
    fetchSeculacers = () => (dispatch) => {
        // types : 
        // 0 - applicants
        // 1 - watchlist
        // 2 - blocked
        const seculacersList = [
            {
                id : 1,
                name : 'person 111',
                contact : '1weq2',
                email : 'email 1',
                address : 'sample address',
                type : 0,
                status : 0,
            },
            {
                id : 2,
                name : 'person 211',
                contact : '1234',
                email : 'email 2',
                address : 'sample address',
                type : 2,
                status : 0,
            },
            {
                id : 3,
                name : 'person 311',
                contact : '1234',
                email : 'email 3',
                address : 'sample address',
                type : 1,
                status : 0,
            },
            {
                id : 4,
                name : 'junre sapico',
                contact : '09569006808',
                address : 'sample address',
                email : 'email 4',
                type : 0,
                status : 1,
            }
        ];

        dispatch(ResponderWatchlistAction.setSeculacersList(seculacersList));
    };

    updateWatchlist = (newEdm) => (dispatch) => {
        //TODO send to back end maybe
        dispatch(ResponderWatchlistAction.updateWatchlist(newEdm));
    
    }
}

export default new ResponderWatchlistService();
