import AsyncStorage from '@react-native-community/async-storage';

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