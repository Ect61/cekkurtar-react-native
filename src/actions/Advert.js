import ActionTypes from '../ActionTypes';
import { setLogin, logout } from '../PPHelper';
import PPConstants from '../PPConstants';
import { Actions } from 'react-native-router-flux';

// -------------------------- SET USER --------------------------

export const setAdvertList = ({ advertData }) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_ADVERT_LIST,
      payload: advertData
    });
  }
};
