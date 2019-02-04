export const SET_TIMESTAMP_OFFSET = 'SET_TIMESTAMP_OFFSET';

export const SET_CURRENT_PATH = 'SET_CURRENT_PATH';

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
}
export default new SystemAction();
