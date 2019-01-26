import UserAction from '../reducers/user/user.action';

class UserService {
    login = (newUser) => (dispatch) => {
        dispatch(UserAction.setNewUser(newUser));
    };

}

export default new UserService();
