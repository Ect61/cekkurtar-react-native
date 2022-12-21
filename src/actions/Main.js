import ActionTypes from '../ActionTypes';
import { setLogin, logout } from '../PPHelper';
import PPConstants from '../PPConstants';
import { Actions } from 'react-native-router-flux';

// -------------------------- SET USER --------------------------

export const setUser = ({ email, password, user, token }) => {
  setLogin(email, password).then((res) => {
    console.log("usersaved");
  });

  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_USER,
      payload: {
        user: user,
        token: token
      }
    });
    Actions.main({ token: token, type: 'reset' });
  }
};

// -------------------------- UPDATE PASSWORD --------------------------

export const updatePassword = ({ email, password }) => {
  return (dispatch) => {
    setLogin(email, password).then((res) => {
      console.log("usersaved");
    });
  }
};

// -------------------------- UPDATE USER --------------------------

export const updateUser = ({ user }) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.UPDATE_USER,
      payload: user
    });
  }
};

// -------------------------- SET NOTIFICATION COUNT --------------------------

export const setNotificationCount = ({ count }) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_NOTIFICATION_COUNT,
      payload: count > 0 ? count : 0 
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
