import { SET_SEARCH_AGENCIES } from './seculacer.agencies.action';

const initialState = {
    agencies : [],
};
class AgenciesReducer {
  reducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SEARCH_AGENCIES: {
        return {...state, agencies : action.agencies};
      }
      default: {
        return state;
      }
    }
  };
}

export default new AgenciesReducer();
