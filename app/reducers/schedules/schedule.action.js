export const SET_SCHEDULES = 'SET_SCHEDULES';

class ScheduleAction {
    setSchedules = schedules => dispatch => 
        dispatch({
            type : SET_SCHEDULES,
            schedules
        });

}

export default new ScheduleAction();
