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

import { updateUser } from '../actions/Main';

class EditProfileScreen extends React.Component {

  state = {
    loading: false,
    email: this.props.userData.email,
    fullname: this.props.userData.fullname,
    phone: this.props.userData.phone,
  }

  saveProfile = () => {
    Keyboard.dismiss();

    if(this.state.fullname.length < 3){
      ShowAlertMessage("Hata", "Lütfen adınızı soyadınızı girin.");
      return;
    }

    if(this.state.phone.length < 3){
      ShowAlertMessage("Hata", "Lütfen telefon numaranızı girin.");
      return;
    }

    this.setState({ loading: true });

    let fullname = this.state.fullname;
    let phone = this.state.phone;

    let url = PPConstants.Api.EditProfile + "?api_token="+ this.props.token + "&fullname=" + fullname  + "&phone=" + phone;

    apiRequest({ url }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        this.props.updateUser({ user: response.user });
        Actions.success({ title: "Başarılı", message: "Profiliniz Güncellendi." });
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
        <Header onPressBack={() => Actions.pop()} title="Profilim" />
        <ScrollView contentContainerStyle={styles.contentContainer} bounces={false} overScrollMode={"never"}>
          <View style={styles.content}>
            <View style={styles.form}>
              <PPInput
                textView
                label="E-Mail Adresiniz*"
                placeholder="E-Mail Adresiniz*"
                keyboardType="email-address"
                onChangeText={value => this.setState({ email: value })}
                value={this.state.email} />
              <PPInput
                label="Adınız Soyadınız*"
                placeholder="Adınız Soyadınız*"
                autoCapitalize="words"
                onChangeText={value => this.setState({ fullname: value })}
                value={this.state.fullname} />
              <PPInput
                label="Telefon Numaranız*"
                placeholder="Telefon Numaranız*"
                keyboardType="number-pad"
                onChangeText={value => this.setState({ phone: value })}
                value={this.state.phone} />
              <PPButton loading={this.state.loading} text="Güncelle" gradientStart={PPConstants.Color.BlueLight} gradientEnd={PPConstants.Color.BlueDark} onPress={() => this.saveProfile()} />
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableWithoutFeedback onPress={() => Actions.changePassword()} underlayColor="white">
              <Text style={styles.forgotText}>Şifremi Değiştir</Text>
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
  forgotText: {
    fontFamily: PPConstants.Font.Normal,
    fontSize: 12,
    lineHeight: 20,
    color: PPConstants.Color.TextLight,
    textAlign: 'center',
  },
  form: {
    paddingTop: 20,
  },
});

const mapStateToProps = ({ main }) => {
  const { user, token } = main;
  return { user, token };
}

export default connect(mapStateToProps, {
  updateUser
})(EditProfileScreen);
