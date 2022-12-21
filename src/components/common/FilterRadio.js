import React from 'react';
import PPConstants from "../../PPConstants";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

export default class SettingsRadio extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPressLabel} underlayColor="transparent">
        <View style={[this.props.style, styles.view]}>
            <Text style={styles.label}>{this.props.label}</Text>
            <Image style={styles.checkbox} source={this.props.value ? require('../../assets/img/checked-radio.png') : require('../../assets/img/unchecked-radio.png')} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    position: 'relative',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 20,
  },
  checkbox: {
    position: 'absolute',
    top: 9,
    right: 0,
    marginRight: 10,
    width: 22,
    height: 22,
  },
  label: {
    fontFamily: PPConstants.Font.Normal,
    color: PPConstants.Color.Text,
    fontSize: 14,
  },
});