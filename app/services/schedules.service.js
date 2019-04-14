import firebase from 'react-native-firebase';
import ScheduleActions from '../reducers/schedules/schedule.action';
import CollectionInfrastructure from '../modules/infrastructures/database.infrastructure/collection.infrastructure';
import BookingsAction from '../reducers/bookings/booking.action';

class SchedulesService {
    // listenSchedules = () => async (dispatch, getState) => {
    //     const firebaseRef = new CollectionInfrastructure(firebase,'Schedules');

    //     firebaseRef.listen(schedules => {
    //         dispatch(ScheduleActions.setSchedules(schedules));
    //     });
    // }

    // listenSchedule = schedId => async (dispatch, getState) => {
    //     const document = firebase.firestore().collection('Schedules').doc(schedId)
        
    //     if(this.listeningSchedule){
    //         this.listeningSchedule();
    //         this.listeningSchedule = null;
    //     }
        
    //     this.listeningSchedule = document.onSnapshot(querySnapshot => {
    //         const data = querySnapshot.data();

    //         dispatch(BookingsAction.updateMakeBooking({
    //             schedule : data
    //         }));
    //         // dispatch(ScheduleActions.setSelectedSchedule(data));
    //     });
    // }
}

export default new SchedulesService();
