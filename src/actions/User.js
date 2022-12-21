import ActionTypes from '../ActionTypes';
import { logout } from '../PPHelper';
import PPConstants from '../PPConstants';
import { Actions } from 'react-native-router-flux';

// -------------------------- SET TOKEN --------------------------

export const setUserToken = ({ token }) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_TOKEN,
      payload: token
    });
  }
};

// -------------------------- LOGOUT --------------------------

export const logoutUser = () => {
  logout();

  Actions.auth({ type: 'reset' });

  return {
    type: ActionTypes.LOGOUT_USER
  };
};