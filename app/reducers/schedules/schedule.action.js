export const SET_SCHEDULES = 'SET_SCHEDULES';

export const SET_TRAVELING_SCHEDULE = 'SET_SCHEDULE';

class ScheduleAction {
    setSchedules = schedules => dispatch => 
        dispatch({
            type : SET_SCHEDULES,
            schedules
        });
    setTravelingSchedule = schedule => dispatch => 
        dispatch({
            type : SET_TRAVELING_SCHEDULE,
            schedule
        });
}

export default new ScheduleAction();
