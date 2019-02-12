import NavigationReducer from '../modules/navigation.with.redux/navigation.reducer';
import SystemReducer from './system/system.reducer';
import UserReducer from './user/user.reducer';
import ContactsReducer from './seculacer.contacts/seculacer.contacts.reducer';
import WhitePaneReducer from './seculacer.white.pane/seculacer.white.pane.reducer';
import ResponderLocationReducer from './responder.locations/responder.location.reducer';
import ResponderEDMsReducer from './responder.edms/responder.edms.reducer';
import ResponderWatchlistReducer from './responder.watchlist/responder.watchlist.reducer';
import NotificationsReducer from './notifications/notifications.reducer';
import ReviewReducer from './responder.review/responder.review.reducer';
import DeviceReducer from './seculacer.control.device/seculacer.control.device.reducer';


export const immutableRecords = [];

export const persistedList = ['system','user','contacts','whitepane','device'];

export default {
  user: UserReducer.reducer,
  system: SystemReducer.reducer,
  notifications: NotificationsReducer.reducer,
  navigation: NavigationReducer.reducer,
  contacts: ContactsReducer.reducer,
  whitepane: WhitePaneReducer.reducer,
  responderlocation: ResponderLocationReducer.reducer,
  responderedms: ResponderEDMsReducer.reducer,
  responderwatchlist: ResponderWatchlistReducer.reducer,
  reviews : ReviewReducer.reducer,
  device : DeviceReducer.reducer,
};