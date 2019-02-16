class IncidentReportsService {
    fetchReports = () => async (dispatch, getState) => {
        const reports = [
            {
                name : 'John Doe',
                date : '02/16/2018',
                address : 'Cebu',
            },
            {
                name : 'John Does',
                date : '02/16/2018',
                address : 'Cebu',
            }
        ];

        return reports;
    }
    submitReport = () => async (dispatch) => {
        // TODO send report to back end
    };

}

export default new IncidentReportsService();
