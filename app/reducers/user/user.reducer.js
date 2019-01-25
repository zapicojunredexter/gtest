import { SET_NEW_USER } from './user.action';

class UserReducer {
  reducer = (state = {test : 'test'}, action) => {
    switch (action.type) {
      case SET_NEW_USER: {
        return action.newUser;
      }
      default: {
        return state;
      }
    }
  };
}

export default new UserReducer();
