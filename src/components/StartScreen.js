import React from 'react';
import PPConstants from '../PPConstants';
import { isLogin, apiRequest } from '../PPHelper';
import { connect } from 'react-redux';
import {
  StyleSheet,
  ActivityIndicator,
  Image,
  View,
  Text,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { setUser } from '../actions/Main';

import { Actions } from 'react-native-router-flux';

class StartScreen extends React.Component {

  constructor(props) {
    super(props);

    isLogin().then((res) => {

      var email = res["email"];
      var password = res["password"];

      if(email != null && password != null){
        console.log("Kullanıcı Var!");
        let url = PPConstants.Api.Login + "?email=" + email + "&password=" + password;
        console.log(url);

        apiRequest({ url }).then((response) => {
          console.log("response");
          console.log(response);
          this.props.setUser({ email: email, password: password, user: response.user, token: response.token });
        }).catch(() => {
          console.log("error");
          Actions.auth({ type: 'reset' });
        });
        return;
      }

      console.log("Kullanıcı Yok!");
      console.log("Giriş Yap");
      Actions.auth({ type: 'reset' });
    });
  }

  render() {
    return (
      <LinearGradient style={styles.container} start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={["#1569ac", "#03256c"]}>
        <Image style={styles.rope} source={require('../assets/img/start-rope.png')} />
        <Image style={styles.cars} source={require('../assets/img/start-car.png')} />
        <View style={styles.content}>
          <Text style={styles.logo}>Çek Kurtar</Text>
          <ActivityIndicator size="small" color="#ffffff" />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontFamily: PPConstants.Font.SemiBold,
    color: '#ffffff',
    fontSize: 24,
    textAlign: 'center',
    paddingBottom: 20,
  },
  rope: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    width: 30,
    height: 148,
  },
  cars: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    width: 220,
    height: 101,
  }
});

export default connect(null, {
  setUser
})(StartScreen);
