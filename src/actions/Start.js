import ActionTypes from '../ActionTypes';
import { isLogin } from '../Authentication';
import PPConstants from '../PPConstants';
import { Actions } from 'react-native-router-flux';

// -------------------------- GET LOGIN --------------------------

export const getLogin = () => {
  
  return (dispatch) => {
    
    console.log("getLogin");

    isLogin().then((res) => {

      var email = res["email"];
      var password = res["password"];

      if(email != null && password != null){
        console.log("Kullanıcı Var!");
        login({ email: email, password: password });
        return;
      }

      console.log("Kullanıcı Yok!");
      console.log("Giriş Yap");
      Actions.auth({ type: 'reset' });
    });
  }
};