import System from './system.record';
import {
    SET_TIMESTAMP_OFFSET,
    SET_CURRENT_PATH,
} from './system.action';

const initialState = {
    timestampOffset: 0,
    path : '',
};
class SystemReducer {
  reducer = (state = initialState, action ) => {
    switch (action.type) {
      case SET_TIMESTAMP_OFFSET: {
        return state.set('timestampOffset', action.timestampOffset);
      }
      case SET_CURRENT_PATH: {
        return {...state, path : action.path};
      }
      default: {
        return state;
      }
    }
  };
}

export default new SystemReducer();
