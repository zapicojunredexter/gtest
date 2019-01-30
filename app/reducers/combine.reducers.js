import NavigationReducer from '../modules/navigation.with.redux/navigation.reducer';
import SystemReducer from './system/system.reducer';
import UserReducer from './user/user.reducer';
import ContactsReducer from './contacts/contacts.reducer';

export const immutableRecords = [];

export const persistedList = ['system','user','contacts'];

export default {
  user: UserReducer.reducer,
  system: SystemReducer.reducer,
  navigation: NavigationReducer.reducer,
  contacts: ContactsReducer.reducer
};
