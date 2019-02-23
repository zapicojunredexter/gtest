import ResponderEDMsAction from '../reducers/responder.edms/responder.edms.action';

class ResponderEDMsService {
    fetchEDMs = () => async (dispatch) => {
        // types : 
        // 0 - pending
        // 1 - responded
        // 2 - done
        /*
        const seculacersList = [
            {
                id : 1,
                name : 'person 111',
                contact : '1weq2',
                email : 'email 1',
                type : 0,
            },
            {
                id : 2,
                name : 'person 211',
                contact : '1234',
                email : 'email 2',
                type : 2,
            },
            {
                id : 3,
                name : 'person 311',
                contact : '1234',
                email : 'email 3',
                type : 1,
            },
            {
                id : 4,
                name : 'junre sapico',
                contact : '09569006808',
                email : 'email 4',
                type : 0,
            }
        ];
        */

        /*

        const state = getState();
        const { api } = state.system;
        const url = `${api}/apis/view_seculacer.php`;

        const response = await fetch(url).catch(error => { throw error });
        const seculacers = await response.json().catch(error => { throw error });
        const seculacersList = seculacers.map(sec => ({
            ...sec,
            id : sec.sec_id,
            name : `${sec.sec_fname} ${sec.sec_lname}`,
            contact : sec.sec_contact,
            email : 'test@gmail.com',
            type : 0,
        }))

        dispatch(ResponderEDMsAction.setSeculacersList(seculacersList));
        */
    };

    updateEDMs = (newEdm) => (dispatch) => {
        //TODO send to back end maybe
        dispatch(ResponderEDMsAction.updateEDMs(newEdm));
    
    }
    
}

export default new ResponderEDMsService();
