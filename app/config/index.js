import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';

import reducers from '../reducers';

const middleWare = [ReduxThunk];

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});
middleWare.push(loggerMiddleware);

const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

export const Store = (onComplete) => {
  const store = autoRehydrate()(createStoreWithMiddleware)(reducers);
  persistStore(store, { storage: AsyncStorage, debounce: 1000 }, onComplete);

  return store;
};

export const BaseURl = 'https://cosmari.e-lios.eu/API/';
