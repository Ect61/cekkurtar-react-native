import React from 'react';
import PPConstants from '../PPConstants';
import {
  Keyboard,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import Header from '../components/common/Header';
import PPButton from '../components/common/PPButton';

import { Actions } from 'react-native-router-flux';

export default class SuccessScreen extends React.Component {

  constructor(props) {
    super(props);
    Keyboard.dismiss();
  }

  renderTitle = () => {
    if(this.props.title){
      return (
        <Text style={styles.successTitle}>{ this.props.title }</Text>
      );
    }
  }

  renderMessage = () => {
    if(this.props.message){
      return (
        <Text style={styles.successMessage}>{ this.props.message }</Text>
      );
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { Actions.pop()}} underlayColor="white">
        <View style={styles.container}>
          <View style={styles.successContent}>
            <Image style={styles.successImage} source={require('../assets/img/success.png')} />
            { this.renderTitle() }
            { this.renderMessage() }
            <View style={styles.successButton}>
              <PPButton text="TAMAM" gradientStart={PPConstants.Color.BlueLight} gradientEnd={PPConstants.Color.BlueDark} onPress={() => Actions.pop() } />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PPConstants.Color.White,
    alignItems: 'stretch'
  },
  successContent: {
    marginTop: -50,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingHorizontal: 20,
  },
  successImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
    alignSelf: 'center'
  },
  successTitle: {
    fontFamily: PPConstants.Font.SemiBold,
    fontSize: 22,
    textAlign: 'center',
    alignSelf: 'center',
    color: PPConstants.Color.Text,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  successMessage: {
    fontFamily: PPConstants.Font.Normal,
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center', 
    alignSelf: 'center',
    paddingBottom: 20,
    color: '#9c9c9c',
  },
  successButton: {
    marginTop: 20,
    marginHorizontal: 40,
  }
});