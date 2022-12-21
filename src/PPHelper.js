import { Alert } from 'react-native';
import PPConstants from './PPConstants';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

export async function isLogin(){
  console.log("AsyncStorage isLogin");
  try {
    var email = await AsyncStorage.getItem("email");
    var password = await AsyncStorage.getItem("password");
    console.log("AsyncStorage isLogin -> " + email + " -- " + password);
    if(email != null && password != null){
      console.log("AsyncStorage isLogin true");
      var response = [];
      response['email'] = email;
      response['password'] = password;
      return response;
    }
    console.log("AsyncStorage isLogin false");
    return false;
  } catch (error) {
    console.log('AsyncStorage isLogin error: ' + error.message);
    return false;
  }
}

export async function setLogin(email, password){
  console.log("AsyncStorage setLogin");
  try {
    console.log('AsyncStorage setLogin saved');
    console.log("email -> " + email);
    console.log("Password -> " + password);
    await AsyncStorage.setItem("email", email);
    await AsyncStorage.setItem("password", password);
    return true;
  } catch (error) {
    console.error('AsyncStorage error: ' + error.message);
    return false;
  }
}

export function logout(){
  try {
    console.log("AsyncStorage logout");
    AsyncStorage.removeItem("email");
    AsyncStorage.removeItem("password");
  } catch (error) {
    console.log('AsyncStorage logout error: ' + error.message);
  }
}

export function ShowAlertMessage(title, message){
  Alert.alert(
    title,
    message,
    [
      {text: 'TAMAM', onPress: () => console.log('OK Pressed')},
    ],
    {cancelable: true},
  );
}

export function GetDistance(lat1, lon1, lat2, lon2) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
    return 0;
  }
  else {
    var radlat1 = Math.PI * lat1/180;
    var radlat2 = Math.PI * lat2/180;
    var theta = lon1-lon2;
    var radtheta = Math.PI * theta/180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return Math.round(dist * 100) / 100;
  }
}

export const apiRequest = async ({ url, formData }) => {
  return new Promise(function(resolve, reject) {
    console.log(url);
    fetch(url, {
      method: formData ? 'POST' : 'GET',
      body: formData ? formData : null,
      headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': formData ? 'multipart/form-data' : 'application/json'
      },
    },
    ).then(response => {
      response.json().then(json => {
        console.log(url);
        console.log("response json -> " + JSON.stringify(json));
        if(json.login == false){
          Actions.auth({ type: 'reset' });
          ShowAlertMessage('Hata!', json.message);
        } else if(json.status == false){
          ShowAlertMessage('Hata!', json.message);
          console.log(json.status);
          resolve(null);
        }
        console.log("success");
        resolve(json);
      }).catch((error) => {
        console.log(url);
        console.log("response error");
        console.log(error);
        ShowAlertMessage('Hata!', "Hata oluştu lütfen tekrar deneyin.");
        resolve(null);
      });
    }).catch((error) => {
      console.log(url);
      console.log("fetch error");
      console.log(error);
      ShowAlertMessage('Hata!', "Hata oluştu lütfen tekrar deneyin.");
      resolve(null);
    });
  });
}
