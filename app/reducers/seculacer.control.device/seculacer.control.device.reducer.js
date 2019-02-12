import { SET_DEVICE_SETTINGS } from './seculacer.control.device.action';

const initialState = {
    pairDevice : false,
    sensor : false,
    gpsLocation : false,
    makeVisible : false,
};
class ControlDeviceReducer {
  reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_DEVICE_SETTINGS: {
        return {...state, ...action.settings};
      }
      default: {
        return state;
      }
    }
  };
}

export default new ControlDeviceReducer();
