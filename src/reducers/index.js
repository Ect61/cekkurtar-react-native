import { combineReducers } from 'redux';
import MainReducer from './MainReducer';
import AdvertReducer from './AdvertReducer';

export default combineReducers({
  main: MainReducer,
  advert: AdvertReducer
});
