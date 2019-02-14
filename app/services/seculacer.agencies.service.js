import AgencyAction from '../reducers/seculacer.agencies/seculacer.agencies.action';

class AgencyService {
    fetchAgencies = () => async dispatch => {
        // TODO send to back end
        const agencies = [
            {
                name : 'sample description',
                stars : 2,
            },
            {
                name : 'sample description',
                stars : 4,
            },
            {
                name : 'sample description',
                stars : 5,
            },
            {
                name : 'sample description',
                stars : 5,
            },
            {
                name : 'sample description 12',
                stars : 5,
            },
        ];
        dispatch(AgencyAction.setAgencies(agencies));
    }
}

export default new AgencyService();
