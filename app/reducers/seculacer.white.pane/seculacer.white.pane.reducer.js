import { SET_EDM_PREFERRED, SET_TEMPLATE_MESSAGE } from './seculacer.white.pane.action';

const initialState = {
    edmPreferred : 'responders',
    templateMessage : 'Please send help',
};
class WhitePaneReducer {
  reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_EDM_PREFERRED: {
        return {...state, edmPreferred : action.edmPreferred};
      }
      case SET_TEMPLATE_MESSAGE : {
        return {...state, templateMessage : action.templateMessage};
      }
      default: {
        return state;
      }
    }
  };
}

export default new WhitePaneReducer();
