import NavigationReducer from '../modules/navigation.with.redux/navigation.reducer';
import SystemReducer from './system/system.reducer';
import UserReducer from './user/user.reducer';

export const immutableRecords = [];

export const persistedList = ['system','user'];

export default {
  user: UserReducer.reducer,
  system: SystemReducer.reducer,
  navigation: NavigationReducer.reducer,
};
