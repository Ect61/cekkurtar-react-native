import ActionTypes from '../ActionTypes';
import { setToken } from '../Authentication';
import PPConstants from '../PPConstants';
import { ShowAlertMessage } from '../PPHelper';
import { Actions } from 'react-native-router-flux';

// -------------------------- INPUT --------------------------

export const inputChanged = ({ prop, value }) => {
  return {
    type: ActionTypes.LOGIN_INPUT,
    payload: { prop, value }
  };
};

export const loginStart = () => {
  return {
    type: ActionTypes.LOGIN_START
  }
}

export const loginUser = ({ email, password }) => {
  console.log("mrb");
  return "erd";
  return (dispatch) => {
    console.log("loginUser");
    dispatch({ type: ActionTypes.LOGIN });
    if(email.length < 3 || PPConstants.Regex.Mail.test(email) === false){
      console.log("loginUser email error");
      dispatch({
        type: ActionTypes.LOGIN_ERROR,
        payload: "Geçersiz email adresi."
      });
      ShowAlertMessage('Hata!', "Geçersiz email adresi.");
      return;
    }
    if(password.length < 6){
      console.log("loginUser password error");
      dispatch({
        type: ActionTypes.LOGIN_ERROR,
        payload: "Hatalı telefon numarası veya şifre."
      });
      ShowAlertMessage('Hata!', "Hatalı telefon numarası veya şifre.");
      return;
    }
    fetch(PPConstants.Api.Login, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    },
    ).then(response => {
      console.log(response);
      response.json().then(json => {
        console.log("response json -> " + JSON.stringify(json));
        if(json.status.code == 200 || json.status.code == 201){
          setToken(json.data.token).then((res) => {
            if(res){
              dispatch({
                type: ActionTypes.LOGIN_SUCCESS
              });
              Actions.main({ type: 'reset' });
            } else {
              dispatch({
                type: ActionTypes.LOGIN_SUCCESS
              });
              Actions.main({ type: 'reset' });
            }
          });
        } else {
          dispatch({
            type: ActionTypes.LOGIN_ERROR,
            payload: json.status.message
          });
          ShowAlertMessage('Hata!', json.status.message);
        }
      }).catch((error) => {
        console.log("loginUser Error Catch");
        dispatch({
          type: ActionTypes.LOGIN_ERROR,
          payload: "Hata oluştu lütfen tekrar deneyin."
        });
        ShowAlertMessage('Hata!', "Hata oluştu lütfen tekrar deneyin.");
      });
    });
  }
};