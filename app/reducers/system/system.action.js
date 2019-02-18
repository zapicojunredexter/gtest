export const SET_TIMESTAMP_OFFSET = 'SET_TIMESTAMP_OFFSET';

export const SET_CURRENT_PATH = 'SET_CURRENT_PATH';

export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION';

export const SET_API = 'SET_API';

class SystemAction {
  setTimestampOffset = (timestampOffset: number) => (dispatch: Function) =>
    dispatch({
      type: SET_TIMESTAMP_OFFSET,
      timestampOffset,
    });
    setCurrentPath = path => (dispatch) => 
        dispatch({
            type : SET_CURRENT_PATH,
            path
        })

    setCurrentLocation = location => dispatch => 
        dispatch({
            type : SET_CURRENT_LOCATION,
            location,
        });
    setAPI = api => dispatch => 
        dispatch({
            type : SET_API,
            api,
        });
}
export default new SystemAction();
