import NavigationReducer from '../modules/navigation.with.redux/navigation.reducer';
import SystemReducer from './system/system.reducer';
import UserReducer from './user/user.reducer';
import ContactsReducer from './contacts/contacts.reducer';
import WhitePaneReducer from './white.pane/white.pane.reducer';

export const immutableRecords = [];

export const persistedList = ['system','user','contacts','whitepane'];

export default {
  user: UserReducer.reducer,
  system: SystemReducer.reducer,
  navigation: NavigationReducer.reducer,
  contacts: ContactsReducer.reducer,
  whitepane: WhitePaneReducer.reducer
};
