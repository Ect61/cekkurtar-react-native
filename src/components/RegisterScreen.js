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
import PPCheck from '../components/common/PPCheck';
import PPButton from '../components/common/PPButton';

import { Actions } from 'react-native-router-flux';

import { setUser } from '../actions/Main';

class RegisterScreen extends React.Component {

  state = {
    loading: false,
    email: "",
    password: "",
    fullname: "",
    phone: "",
    userType: 0
  }

  register = () => {
    Keyboard.dismiss();

    if(this.state.fullname.length < 3){
      ShowAlertMessage("Hata", "Lütfen adınızı soyadınızı girin.");
      return;
    }

    if(PPConstants.Regex.Mail.test(this.state.email) === false){
      ShowAlertMessage("Hata", "Lütfen email adresinizi girin.");
      return;
    }

    if(this.state.phone.length < 3){
      ShowAlertMessage("Hata", "Lütfen telefon numaranızı girin.");
      return;
    }

    if(this.state.password.length < 6){
      ShowAlertMessage("Hata", "Lütfen en az 6 karakterli şifrenizi girin.");
      return;
    }

    this.setState({ loading: true });

    let email = this.state.email;
    let password = this.state.password;
    let fullname = this.state.fullname;
    let phone = this.state.phone;
    let userType = this.state.userType;

    let url = PPConstants.Api.Register + "?email=" + email + "&password=" + password + "&fullname=" + fullname + "&phone=" + phone + "&user_type=" + userType;
    console.log(url);

    apiRequest({ url }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        Actions.pop();
        Actions.login({ email: email, password: password });
        ShowAlertMessage('Başarılı!', "Kayıt başarılı lütfen giriş yapın.");
        // this.props.setUser({ email: email, password: password, user: response.user, token: response.token });
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
        <Header onPressBack={() => Actions.pop()} pageTitle="Kayıt Ol" />
        <ScrollView contentContainerStyle={styles.contentContainer} bounces={false} overScrollMode={"never"}>
          <View style={styles.content}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.contentText}>Zaten hesabın var mı?</Text>
              <TouchableWithoutFeedback onPress={() => { Actions.pop(); Actions.login() }} underlayColor="white">
                <Text style={[styles.contentText, styles.blueText]}>Giriş Yap!</Text>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.form}>
              <PPInput
                label="Adınız Soyadınız*"
                placeholder="Adınız Soyadınız*"
                autoCapitalize="words"
                onChangeText={value => this.setState({ fullname: value })}
                value={this.state.fullname} />
              <PPInput
                label="E-Mail Adresiniz*"
                placeholder="E-Mail Adresiniz*"
                keyboardType="email-address"
                onChangeText={value => this.setState({ email: value })}
                value={this.state.email} />
              <PPInput
                label="Telefon Numaranız*"
                placeholder="Telefon Numaranız*"
                keyboardType="number-pad"
                onChangeText={value => this.setState({ phone: value })}
                value={this.state.phone} />
              <PPInput
                label="Şifreniz*"
                placeholder="Şifreniz*"
                secureTextEntry={true}
                onChangeText={value => this.setState({ password: value })}
                value={this.state.password} />
              <View style={styles.checkboxView}>
                <PPCheck
                  label="Araç Üyeliği*"
                  placeholder="Çekici Üyeliği*"
                  secureTextEntry={true}
                  onChange={value => this.setState({ userType: 0 })}
                  value={this.state.userType == 0 ? true : false} />
                <PPCheck
                  label="Çekici Üyeliği*"
                  placeholder="Çekici Üyeliği*"
                  secureTextEntry={true}
                  onChange={value => this.setState({ userType: 1 })}
                  value={this.state.userType == 1 ? true : false} />
              </View>
              <PPButton loading={this.state.loading} text="Kayıt Ol" gradientStart={PPConstants.Color.BlueLight} gradientEnd={PPConstants.Color.BlueDark} onPress={() => this.register()} />
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableWithoutFeedback onPress={() => Actions.termsOfUse()} underlayColor="white">
              <Text style={styles.forgotText}>Kullanım Koşulları ve Gizlilik Sözleşmesi</Text>
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
  checkboxView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  form: {
    paddingTop: 20,
  },
});

export default connect(null, {
  setUser
})(RegisterScreen);
