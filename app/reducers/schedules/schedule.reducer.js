import {
    SET_SCHEDULES,
    SET_TRAVELING_SCHEDULE
} from './schedule.action';

class ScheduleReducer {
    reducer = (state = {
        travelingSchedule : null,
        schedules : []
    }, action ) => {
        switch (action.type) {
            case SET_SCHEDULES: {
                return { ...state, schedules : action.schedules };
            }
            case SET_TRAVELING_SCHEDULE: {
                return { ...state, travelingSchedule : action.schedule };
            }
            default: {
                return state;
            }
        }
    };
}

export default new ScheduleReducer();
