import NavigationReducer from '../modules/navigation.with.redux/navigation.reducer';
import SystemReducer from './system/system.reducer';

export const immutableRecords = [];

export const persistedList = ['system'];

export default {
    system: SystemReducer.reducer,
    navigation: NavigationReducer.reducer,
};
