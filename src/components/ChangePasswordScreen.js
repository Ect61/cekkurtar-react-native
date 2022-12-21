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

import { updatePassword } from '../actions/Main';

class ChangePasswordScreen extends React.Component {

  state = {
    loading: false,
    oldPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  }

  saveProfile = () => {
    Keyboard.dismiss();

    if(this.state.oldPassword.length < 6){
      ShowAlertMessage("Hata", "Lütfen eski şifrenizi girin.");
      return;
    }

    if(this.state.newPassword.length < 6){
      ShowAlertMessage("Hata", "Lütfen en az 6 karakterli yeni şifrenizi girin.");
      return;
    }

    if(this.state.newPassword != this.state.newPasswordAgain){
      ShowAlertMessage("Hata", "Yeni şifreleriniz eşleşmiyor.");
      return;
    }

    if(this.state.oldPassword == this.state.newPassword){
      ShowAlertMessage("Hata", "Eski şifreniz ile yeni şifreniz aynı olamaz.");
      return;
    }

    this.setState({ loading: true });

    let oldPassword = this.state.oldPassword;
    let newPassword = this.state.newPassword;

    let email = this.props.user.email;

    let url = PPConstants.Api.ChangePassword + "?api_token="+ this.props.token + "&old_password=" + oldPassword  + "&new_password=" + newPassword;

    apiRequest({ url }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        this.props.updatePassword({ email: email, password: newPassword });
        Actions.pop();
        Actions.success({ title: "Başarılı", message: "Şifreniz Güncellendi." });
        this.setState({ loading: false });
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
        <Header onPressBack={() => Actions.pop()} title="Şifremi Değiştir" />
        <ScrollView contentContainerStyle={styles.contentContainer} bounces={false} overScrollMode={"never"}>
          <View style={styles.content}>
            <View style={styles.form}>
              <PPInput
                label="Eski Şifreniz*"
                placeholder="Eski Şifreniz*"
                secureTextEntry={true}
                onChangeText={value => this.setState({ oldPassword: value })}
                value={this.state.oldPassword} />
              <View style={styles.border} />
              <PPInput
                label="Yeni Şifreniz*"
                placeholder="Yeni Şifreniz*"
                secureTextEntry={true}
                onChangeText={value => this.setState({ newPassword: value })}
                value={this.state.newPassword} />
              <PPInput
                label="Yeni Şifreniz Tekrar*"
                placeholder="Yeni Şifreniz Tekrar*"
                secureTextEntry={true}
                onChangeText={value => this.setState({ newPasswordAgain: value })}
                value={this.state.newPasswordAgain} />
              <PPButton loading={this.state.loading} text="Güncelle" gradientStart={PPConstants.Color.BlueLight} gradientEnd={PPConstants.Color.BlueDark} onPress={() => this.saveProfile()} />
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
  form: {
    paddingTop: 20,
  },
  border: {
    marginBottom: 15,
    height: 1,
    backgroundColor: '#ebebeb',
  }
});

const mapStateToProps = ({ main }) => {
  const { user, token } = main;
  return { user, token };
}

export default connect(mapStateToProps, {
  updatePassword
})(ChangePasswordScreen);
