export const SET_NEW_USER = 'SET_NEW_USER';

class UserAction {
  setNewUser = (newUser) => (dispatch) =>
    dispatch({
      type: SET_NEW_USER,
      newUser,
    });
}
export default new UserAction();
