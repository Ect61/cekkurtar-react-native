import ActionTypes from '../ActionTypes';
import { setToken } from '../Authentication';
import PPConstants from '../PPConstants';
import { ShowAlertMessage } from '../PPHelper';
import { Actions } from 'react-native-router-flux';

// -------------------------- INPUT --------------------------

export const inputChanged = ({ prop, value }) => {
  return {
    type: ActionTypes.REGISTER_INPUT,
    payload: { prop, value }
  };
};

export const registerStart = () => {
  return {
    type: ActionTypes.REGISTER_START
  }
}

export const registerUser = ({ firstname, lastname, email, phone, company, password, passwordAgain }) => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.REGISTER });
    if(firstname.length < 3 || lastname.length < 3 || email.length < 6 || phone.length < 6 || company.length < 2){
      console.log("register input error");
      dispatch({
        type: ActionTypes.REGISTER_ERROR,
        payload: "Lütfen tüm alanları doldurun."
      });
      ShowAlertMessage('Hata!', "Lütfen tüm alanları doldurun.");
      return;
    }
    if(email.length < 3 || PPConstants.Regex.Mail.test(email) === false){
      console.log("register email error");
      dispatch({
        type: ActionTypes.REGISTER_ERROR,
        payload: "Geçersiz email adresi."
      });
      ShowAlertMessage('Hata!', "Geçersiz email adresi.");
      return;
    }
    if(password.length < 6 || passwordAgain.length < 6){
      console.log("register password error");
      dispatch({
        type: ActionTypes.REGISTER_ERROR,
        payload: "Şifreniz en az 6 karakter olmalıdır."
      });
      ShowAlertMessage('Hata!', "Şifreniz en az 6 karakter olmalıdır.");
      return;
    }
    if(password.length != passwordAgain.length){
      console.log("register passwordAgain error");
      dispatch({
        type: ActionTypes.REGISTER_ERROR,
        payload: "Şifreleriniz eşleşmiyor."
      });
      ShowAlertMessage('Hata!', "Şifreleriniz eşleşmiyor.");
      return;
    }
    if(phone.length < 6){
      console.log("register phone error");
      dispatch({
        type: ActionTypes.REGISTER_ERROR,
        payload: "Lütfen telefon numaranızı girin."
      });
      ShowAlertMessage('Hata!', "Lütfen telefon numaranızı girin.");
      return;
    }
    fetch(PPConstants.Api.Register, {
      method: 'POST',
      body: JSON.stringify({
        first_name: firstname,
        last_name: lastname,
        email: email,
        password: password,
        mobile_phone: phone,
        company_name: company,
        role: "ROLE_COMPANY",
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
            type: ActionTypes.REGISTER_SUCCESS
          });
          Actions.login();
        } else {
          dispatch({
            type: ActionTypes.REGISTER_ERROR,
            payload: json.status.message
          });
          ShowAlertMessage('Hata!', json.status.message);
        }
      }).catch((error) => {
        console.log("Register Error Catch");
        dispatch({
          type: ActionTypes.REGISTER_ERROR,
          payload: "Hata oluştu lütfen tekrar deneyin."
        });
        ShowAlertMessage('Hata!', "Hata oluştu lütfen tekrar deneyin.");
        return;
      });
    });
  }
};