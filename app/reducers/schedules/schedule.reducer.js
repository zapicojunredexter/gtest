import {
    SET_SCHEDULES,
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
            default: {
                return state;
            }
        }
    };
}

export default new ScheduleReducer();
