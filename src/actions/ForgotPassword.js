import ActionTypes from '../ActionTypes';
import { setLogin } from '../Authentication';
import PPConstants from '../PPConstants';
import { ShowAlertMessage } from '../PPHelper';
import { Actions } from 'react-native-router-flux';

// -------------------------- INPUT --------------------------

export const inputChanged = ({ prop, value }) => {
  return {
    type: ActionTypes.FORGOTPASSWORD_INPUT,
    payload: { prop, value }
  };
};

export const forgotPasswordStart = () => {
  return {
    type: ActionTypes.FORGOTPASSWORD_START
  }
}

export const forgotPassword = ({ email }) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.FORGOTPASSWORD });
    if(email.length < 3 || PPConstants.Regex.Mail.test(email) === false){
      console.log("forgotpassword email error");
      dispatch({
        type: ActionTypes.FORGOTPASSWORD_ERROR,
        payload: "Geçersiz email adresi."
      });
      ShowAlertMessage('Hata!', "Geçersiz email adresi.");
      return;
    }
    fetch(PPConstants.Api.ForgotPassword, {
      method: 'POST',
      body: JSON.stringify({
        email: email,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    },
    ).then(response => {
      console.log("response ok");
      console.log(response);
      response.json().then(json => {
        console.log("response json -> " + JSON.stringify(json));
        if(json.status.code == 200 || json.status.code == 201){
          dispatch({
            type: ActionTypes.FORGOTPASSWORD_SUCCESS
          });
          Actions.pop();
          Actions.success({
            title: 'Sıfırlama bağlantısı gönderildi',
            message: 'Sıfırlamak için gerekli bağlantı gönderilmiştir. Lütfen e-posta hesabınızı kontrol ediniz.'
          });
          return;
        } else {
          console.log("Forgot Password");
          dispatch({
            type: ActionTypes.FORGOTPASSWORD_ERROR,
            payload: json.status.message
          });
          ShowAlertMessage('Hata!', json.status.message);
          return;
        }
      }).catch((error) => {
        console.log("Forgot Password Catch");
        dispatch({
          type: ActionTypes.FORGOTPASSWORD_ERROR,
          payload: "Hata oluştu lütfen tekrar deneyin."
        });
        ShowAlertMessage('Hata!', "Hata oluştu lütfen tekrar deneyin.");
        return;
      });
    });
  }
};