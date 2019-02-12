import ControlDeviceActions from '../reducers/seculacer.control.device/seculacer.control.device.action';

class ControlDevice {
    updateDeviceSettings = setting => dispatch => {
        // TODO send to back end
        dispatch(ControlDeviceActions.setDeviceSettings(setting));
    }
}

export default new ControlDevice();
