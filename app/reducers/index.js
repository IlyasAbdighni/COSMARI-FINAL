import { combineReducers } from 'redux';
import city from './AppReducers';
import form from './FormReducers';

export default combineReducers({
  city,
  form
});
