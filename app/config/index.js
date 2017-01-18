import Realm from 'realm';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from '../reducers';

const middleWare = [ReduxThunk];

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development',
});
middleWare.push(loggerMiddleware);

const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

export const Store = () => {
  return createStoreWithMiddleware(reducers);
};

export const BaseURl = 'https://cosmari.e-lios.eu/API/';

export const realm = new Realm({
     schema: [{
       name: 'myLocalCommunities',
       properties: {
         name: 'string',
         id: 'int',
         selected: 'bool'
       }
     }
   ]
   });

export const getChoosenCommunity = () => {
  const realmList = realm.objects('myLocalCommunities');
  let community = null;
  if (realmList.length) {
    realmList.forEach((item) => {
      if (item.selected) {
        community = {
          name: item.name,
          id: item.id
        };
      }
    });
  }
  return community;
};
