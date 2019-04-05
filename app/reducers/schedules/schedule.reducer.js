import {
    SET_SCHEDULES,
    SET_SCHEDULE
} from './schedule.action';

class ScheduleReducer {
    reducer = (state = {
        selectedSchedule : null,
        schedules : []
    }, action ) => {
        switch (action.type) {
            case SET_SCHEDULES: {
                return { ...state, schedules : action.schedules };
            }
            case SET_SCHEDULE: {
                return { ...state, selectedSchedule : action.schedule };
            }
            default: {
                return state;
            }
        }
    };
}

export default new ScheduleReducer();
