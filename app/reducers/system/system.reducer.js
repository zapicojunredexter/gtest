import System from './system.record';
import {
    SET_TIMESTAMP_OFFSET,
    SET_CURRENT_PATH,
    SET_CURRENT_LOCATION,
    SET_API
} from './system.action';

const initialState = {
    api : 'http://192.168.254.101/mobile_seculace',
    timestampOffset: 0,
    path : '',
    currentLocation : {
        latitude : null,
        longitude : null
    },
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
      case SET_CURRENT_LOCATION: {
        return {...state, currentLocation : action.location};
      }
      case SET_API: {
        return {...state, api : action.api};
      }
      default: {
        return state;
      }
    }
  };
}

export default new SystemReducer();
