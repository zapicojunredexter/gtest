import { SET_NEW_USER } from './user.action';

const initialState = {
    user : null
};
class UserReducer {
  reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_NEW_USER: {
        return {...state, user : action.newUser};
      }
      default: {
        return state;
      }
    }
  };
}

export default new UserReducer();
