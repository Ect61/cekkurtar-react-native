import React from 'react';
import PPConstants from "../../PPConstants";
import {
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';

export default class PPCheck extends React.Component {
  render() {
    return (
      <View style={[this.props.style, { flexDirection: 'row', paddingHorizontal: 20, marginVertical: 10, }]}>
        <TouchableWithoutFeedback onPress={this.props.onChange} underlayColor="transparent">
          <View>
            <Image style={styles.checkbox} source={this.props.value ? require('../../assets/img/checked-single.png') : require('../../assets/img/unchecked-single.png')} />
            <Text style={styles.label}>{this.props.label}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',  
    marginRight: 10,
    width: 24,
    height: 24,
  },
  label: {
    fontFamily: PPConstants.Font.SemiBold,
    fontSize: 12,
    color: PPConstants.Color.TextLight,
    lineHeight: 18,
    paddingTop: 10,
    paddingBottom: 10,
  },
});