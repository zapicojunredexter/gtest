import UserAction from '../reducers/user/user.action';

class UserService {
  login = (newUser) => (dispatch) => {
      console.log('NATAWAG SHAAAA', newUser);
    dispatch(UserAction.setNewUser(newUser));
  };

}

export default new UserService();
