import {createStore} from 'redux';
import reducer from './rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
   key: 'root',
   storage: AsyncStorage,
};

const persistRed = persistReducer(persistConfig, reducer)
export default () => {
   let store = createStore(persistRed);
   let persistor = persistStore(store);
   return {store, persistor}
}

