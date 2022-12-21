import React from 'react';
import PPConstants from '../PPConstants';
import {
  StyleSheet,
  ActivityIndicator,
  Image,
  View,
  Dimensions,
  Text,
} from 'react-native';
import { connect } from 'react-redux';

import PPButton from './common/PPButton';

import LinearGradient from 'react-native-linear-gradient';

import { Actions } from 'react-native-router-flux';

export default class AuthScreen extends React.Component {

  render() {
    return (
      <LinearGradient style={styles.container} start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={["#1569ac", "#03256c"]}>
        <Image style={styles.rope} source={require('../assets/img/rope-short.png')} />
        <Image style={styles.cars} source={require('../assets/img/start-car.png')} />
        <View style={styles.content}>
          <Text style={styles.logo}>Çek Kurtar</Text>
          <Text style={styles.description}>Araç sahibi ve çekiciyi hızlı ve güvenilir şekilde buluşturan yol yardım platformu.</Text>
        </View>
        <View style={styles.buttonView}>
          <PPButton text={"Giriş Yap"} onPress={() => Actions.login()} textColor={PPConstants.Color.Primary} backgroundColor={PPConstants.Color.White} />
          <PPButton text={"Kayıt Ol"} onPress={() => Actions.register()} textColor={PPConstants.Color.Primary} backgroundColor={PPConstants.Color.White} />
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
    fontSize: 40,
    textAlign: 'center',
    paddingBottom: 20,
  },
  description: {
    fontFamily: PPConstants.Font.Light,
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 24,
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  rope: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    width: 43,
    height: 106,
  },
  cars: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 90,
    width: Dimensions.get('window').width * 0.8,
    height: (Dimensions.get('window').width * 0.8 * 101 / 220),
  },
  buttonView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
  }
});
