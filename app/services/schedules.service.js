import firebase from 'react-native-firebase';
import ScheduleActions from '../reducers/schedules/schedule.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';

const firebaseRef = new CollectionInfrastructure(firebase,'Schedules');

class SchedulesService {
    listenSchedules = () => async (dispatch, getState) => {

        firebaseRef.listen(schedules => {
            dispatch(ScheduleActions.setSchedules(schedules));
        });
        /*
        const schedules = [
            {
                test: "test",
                testa: "testa",
            },
            {
                test: "test",
                testa: "testa",
            },
        ];
        dispatch(ScheduleActions.setSchedules(schedules));
        */
    }
}

export default new SchedulesService();
