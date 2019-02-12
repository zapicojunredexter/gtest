export const SET_DEVICE_SETTINGS = 'SET_DEVICE_SETTINGS';

class ControlDeviceActions {
    setDeviceSettings = (settings) => (dispatch) =>
        dispatch({
            type: SET_DEVICE_SETTINGS,
            settings,
        });
}
export default new ControlDeviceActions();
