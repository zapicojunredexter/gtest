export const SET_SCHEDULES = 'SET_SCHEDULES';

export const SET_SCHEDULE = 'SET_SCHEDULE';

class ScheduleAction {
    setSchedules = schedules => dispatch => 
        dispatch({
            type : SET_SCHEDULES,
            schedules
        });
    setSelectedSchedule = schedule => dispatch => 
        dispatch({
            type : SET_SCHEDULE,
            schedule
        });
}

export default new ScheduleAction();
