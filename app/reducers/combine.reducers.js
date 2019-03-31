import NavigationReducer from '../modules/navigation.with.redux/navigation.reducer';
import SystemReducer from './system/system.reducer';
import TerminalsReducer from './terminals/terminals.reducer';

export const immutableRecords = [];

export const persistedList = ['system'];

export default {
    system: SystemReducer.reducer,
    terminals: TerminalsReducer.reducer,
    navigation: NavigationReducer.reducer,
};
