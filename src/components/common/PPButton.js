import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  TouchableWithoutFeedback,
  View,
  Text,
} from 'react-native';
import PPConstants from "../../PPConstants";
import LinearGradient from 'react-native-linear-gradient';

export default class PPButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFocus: false
    };
  }

  setFocus(hasFocus) {
    this.setState({hasFocus})
  }

  render() {
    if(this.props.loading){
      if(this.props.gradientStart){
        return (
          <TouchableWithoutFeedback onPress={this.props.onPress} underlayColor="white">
            <LinearGradient style={[styles.gradientButtonView, this.props.style ? this.props.style : ""]} start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={[this.props.gradientStart, this.props.gradientEnd]}>
              <ActivityIndicator size="small" color="#FFFFFF" />
            </LinearGradient>
          </TouchableWithoutFeedback>
        );
      }
      
      return (
        <View style={styles.primaryButton}>
          <View style={[styles.primaryButtonView, this.props.backgroundColor ? { backgroundColor: this.props.backgroundColor, borderColor: this.props.backgroundColor } : "", this.props.borderColor ? { borderColor: this.props.borderColor } : ""]}>
            <ActivityIndicator size="small" color="#FFFFFF" />
          </View>
        </View>
      );
    }

    if(this.props.outline){
      if(this.props.red){
        return (
          <View style={styles.outlineButton}>
            <TouchableWithoutFeedback onPress={this.props.onPress} underlayColor="white">
              <View style={[ styles.outlineButtonView, styles.outlineButtonRedView ]}>
                <Text style={styles.outlineButtonText}>{this.props.text}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        );
      }
      if(this.props.green){
        return (
          <View style={styles.outlineButton}>
            <TouchableWithoutFeedback onPress={this.props.onPress} underlayColor="white">
              <View style={[ styles.outlineButtonView, styles.outlineButtonGreenView ]}>
                <Text style={[ styles.outlineButtonText, styles.outlineButtonGreenText ]}>{this.props.text}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        );
      }
      return (
        <View style={styles.outlineButton}>
          <TouchableWithoutFeedback onPress={this.props.onPress} underlayColor="white">
            <View style={styles.outlineButtonView}>
              <Text style={styles.outlineButtonText}>{this.props.text}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }

    if(this.props.green){
      return (
        <View style={styles.primaryButton}>
          <TouchableWithoutFeedback onPress={this.props.onPress} underlayColor="white">
            <View style={[ styles.primaryButtonView, styles.primaryButtonGreenView ]}>
              <Text style={styles.primaryButtonText}>{this.props.text}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }

    if(this.props.gradientStart){
      return (
        <TouchableWithoutFeedback onPress={this.props.onPress} underlayColor="white">
          <LinearGradient style={[styles.gradientButtonView, this.props.style ? this.props.style : ""]} start={{x: 0, y: 0}} end={{x: 0, y: 1}} colors={[this.props.gradientStart, this.props.gradientEnd]}>
            <Text style={[styles.primaryButtonText, this.props.textColor ? { color: this.props.textColor } : ""]}>{this.props.text}</Text>
          </LinearGradient>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <View style={styles.primaryButton}>
        <TouchableWithoutFeedback onPress={this.props.onPress} underlayColor="white">
          <View style={[styles.primaryButtonView, this.props.backgroundColor ? { backgroundColor: this.props.backgroundColor, borderColor: this.props.backgroundColor } : "", this.props.borderColor ? { borderColor: this.props.borderColor } : "", this.props.style ? this.props.style : ""]}>
            <Text style={[styles.primaryButtonText, this.props.textColor ? { color: this.props.textColor } : ""]}>{this.props.text}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  primaryButton: {
    width: '100%',
    marginBottom: 20
  },
  gradientButtonView: {
    height: 40,
    justifyContent: 'center',
    borderRadius: 20,
    marginBottom: 20
  },
  primaryButtonView: {
    backgroundColor: PPConstants.Color.Primary,
    height: 40,
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: PPConstants.Color.Primary
  },
  primaryButtonGreenView: {
    backgroundColor: PPConstants.Color.Green,
    borderColor: PPConstants.Color.Green,
  },
  primaryButtonLoading: {
    backgroundColor: PPConstants.Color.Primary,
    height: 40,
    justifyContent: 'center',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: PPConstants.Color.Primary
  },
  primaryButtonText: {
    fontFamily: PPConstants.Font.Bold,
    fontSize: 14,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
  greenButton: {
    backgroundColor: PPConstants.Color.Green,
    borderColor: PPConstants.Color.Green,
  },
  outlineButton: {
    width: '100%',
    marginBottom: 20
  },
  outlineButtonView: {
    backgroundColor: 'transparent',
    height: 40,
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: PPConstants.Color.White
  },
  outlineButtonRedView: {
    borderColor: '#c90000',
  },
  outlineButtonGreenView: {
    borderColor: PPConstants.Color.Green
  },
  outlineButtonGreenText: {
    color: PPConstants.Color.Green
  },
  outlineButtonText: {
    fontFamily: PPConstants.Font.Bold,
    fontSize: 14,
    alignSelf: 'center',
    color: '#FFFFFF',
  },
});