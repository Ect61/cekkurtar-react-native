import React from 'react';
import PPConstants from '../PPConstants';
import { ShowAlertMessage, setLogin, apiRequest } from '../PPHelper';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Header from '../components/common/Header';
import PPInput from '../components/common/PPInput';
import PPButton from '../components/common/PPButton';

import { Actions } from 'react-native-router-flux';

import { setUser } from '../actions/Main';

class LoginScreen extends React.Component {

  state = {
    loading: false,
    email: this.props.email ? this.props.email : "",
    password: this.props.password ? this.props.password : ""
  }

  login = () => {
    Keyboard.dismiss();

    if(PPConstants.Regex.Mail.test(this.state.email) === false){
      ShowAlertMessage("Hata", "Lütfen email adresinizi girin.");
      return;
    }

    if(this.state.password.length < 3){
      ShowAlertMessage("Hata", "Lütfen şifrenizi girin.");
      return;
    }

    this.setState({ loading: true });

    let email = this.state.email;
    let password = this.state.password;

    let url = PPConstants.Api.Login + "?email=" + email + "&password=" + password;
    console.log(url);

    apiRequest({ url }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        this.props.setUser({ email: email, password: password, user: response.user, token: response.token });
      } else {
        this.setState({ loading: false });
      }
    }).catch((error) => {
      console.log("apiRequest error");
      console.log(error);
      this.setState({ loading: false });
      ShowAlertMessage('Hata!', "Hata oluştu lütfen tekrar deneyin.");
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header onPressBack={() => Actions.pop()} pageTitle="Giriş Yap" />
        <ScrollView contentContainerStyle={styles.contentContainer} bounces={false} overScrollMode={"never"}>
          <View style={styles.content}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.contentText}>Henüz bir hesabın yok mu?</Text>
              <TouchableWithoutFeedback onPress={() => { Actions.pop(); Actions.register() }} underlayColor="white">
                <Text style={[styles.contentText, styles.blueText]}>Kayıt Ol!</Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.form}>
              <PPInput
                label="E-Mail Adresiniz*"
                placeholder="E-Mail Adresiniz*"
                keyboardType="email-address"
                onChangeText={value => this.setState({ email: value })}
                value={this.state.email} />
              <PPInput
                label="Şifreniz*"
                placeholder="Şifreniz*"
                secureTextEntry={true}
                onChangeText={value => this.setState({ password: value })}
                value={this.state.password} />
              <PPButton loading={this.state.loading} text="Giriş Yap" gradientStart={PPConstants.Color.BlueLight} gradientEnd={PPConstants.Color.BlueDark} onPress={() => this.login()} />
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableWithoutFeedback onPress={() => Actions.forgotPassword()} underlayColor="white">
              <Text style={styles.forgotText}>Şifremi Unuttum</Text>
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PPConstants.Color.White,
    alignItems: 'center'
  },
  content: {
    width: '100%',
  },
  contentContainer: {
    width: Dimensions.get('window').width,
    padding: 20,
    alignItems: 'stretch'
  },
  contentText: {
    fontFamily: PPConstants.Font.Normal,
    color: PPConstants.Color.TextLightest,
    fontSize: 13,
    lineHeight: 20,
  },
  forgotText: {
    fontFamily: PPConstants.Font.Normal,
    fontSize: 12,
    lineHeight: 20,
    color: PPConstants.Color.TextLight,
    textAlign: 'center',
  },
  blueText: {
    marginLeft: 5,
    fontFamily: PPConstants.Font.SemiBold,
    color: PPConstants.Color.Primary
  },
  form: {
    paddingTop: 20,
  },
});

export default connect(null, {
  setUser
})(LoginScreen);
