import NavigationReducer from '../modules/navigation.with.redux/navigation.reducer';
import SystemReducer from './system/system.reducer';
import User from './user/user.reducer';
import TerminalsReducer from './terminals/terminals.reducer';

export const immutableRecords = [];

export const persistedList = ['user','system'];

export default {
    user: User.reducer,
    system: SystemReducer.reducer,
    terminals: TerminalsReducer.reducer,
    navigation: NavigationReducer.reducer,
};
