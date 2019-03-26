import NavigationReducer from '../modules/navigation.with.redux/navigation.reducer';
import SystemRecord from './system/system.record';
import SystemReducer from './system/system.reducer';

export const immutableRecords = [];

export const persistedList = ['system'];

export default {
  system: SystemReducer.reducer,
  navigation: NavigationReducer.reducer,
//   memos: MemosReducer.reducer,
//   filters: FiltersReducer.reducer,
};
