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

export default class ForgotPasswordScreen extends React.Component {

  state = {
    loading: false,
    email: "",
  }

  forgotPassword = () => {
    Keyboard.dismiss();

    if(PPConstants.Regex.Mail.test(this.state.email) === false){
      ShowAlertMessage("Hata", "Lütfen email adresinizi girin.");
      return;
    }

    this.setState({ loading: true });

    let email = this.state.email;

    let url = PPConstants.Api.ForgotPassword + "?email=" + email;
    console.log(url);

    apiRequest({ url }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        Actions.pop();
        Actions.success({ title: "Başarılı", message: "Yeni şifreniz mail adresinize gönderilmiştir." });
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
        <Header onPressBack={() => Actions.pop()} pageTitle="Şifremi Unuttum" />
        <ScrollView contentContainerStyle={styles.contentContainer} bounces={false} overScrollMode={"never"}>
          <View style={styles.content}>
            <View>
              <Text style={styles.contentText}>Şifreniz kayıtlı olduğunuz mail adresinize gönderilecektir.</Text>
            </View>
            <View style={styles.form}>
              <PPInput
                label="E-Mail Adresiniz*"
                placeholder="E-Mail Adresiniz*"
                keyboardType="email-address"
                onChangeText={value => this.setState({ email: value })}
                value={this.state.email} />
              <PPButton loading={this.state.loading} text="Şifremi Sıfırla" gradientStart={PPConstants.Color.BlueLight} gradientEnd={PPConstants.Color.BlueDark} onPress={() => this.forgotPassword()} />
            </View>
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
  blueText: {
    marginLeft: 5,
    fontFamily: PPConstants.Font.SemiBold,
    color: PPConstants.Color.Primary
  },
  form: {
    paddingTop: 20,
  },
});