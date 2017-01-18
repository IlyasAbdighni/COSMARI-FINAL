import { combineReducers } from 'redux';
import city from './AppReducers';
import form from './FormReducers';
import routes from './routes';

export default combineReducers({
  city,
  form,
  routes
});
