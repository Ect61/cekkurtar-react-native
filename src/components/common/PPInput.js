import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text
} from 'react-native';
import PPConstants from "../../PPConstants";

export default class PPInput extends React.Component {

  renderLabel(){
    if(this.props.label){
      return (
        <Text style={styles.label}>{ this.props.label }</Text>
      );
    }
  }

  render() {
    if(this.props.onlyLabel){
      return (
        <View style={styles.view}>
          { this.renderLabel() }
        </View>
      );
    }

    if(this.props.textView){
      return (
        <View style={styles.view}>
          { this.renderLabel() }
          <View style={styles.inputView}>
            <Text style={styles.textView}>{ this.props.value }</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.view}>
        { this.renderLabel() }
        <TextInput
          {...this.props}
          style={[ styles.textInput, this.props.bigInput ? styles.bigInput : "" ]}
          autoCapitalize={this.props.autoCapitalize ? this.props.autoCapitalize : "none"}
          autoCorrect={false}
          returnKeyType={this.props.returnKeyType ? this.props.returnKeyType : "next"}
          multiline={this.props.multiline ? this.props.multiline : false}
          underlineColorAndroid='transparent'
          placeHolderColor={PPConstants.Color.TextLighter}
          selectionColor={PPConstants.Color.Blue} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  label: {
    fontFamily: PPConstants.Font.SemiBold,
    fontSize: 12,
    paddingBottom: 5,
    color: PPConstants.Color.TextLight,
  },
  textInput: {
    alignSelf: 'stretch',
    fontFamily: PPConstants.Font.Normal,
    fontWeight: 'normal',
    fontSize: 13,
    color: PPConstants.Color.TextLight,
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    paddingVertical: 0,
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: PPConstants.Color.InputLight,
    borderWidth: 2,
    borderColor: PPConstants.Color.Border,
  },
  bigInput: {
    minHeight: 120,
    height: 'auto',
    paddingVertical: 10,
    textAlignVertical: 'top'
  },

  inputView: {
    alignSelf: 'stretch',
    height: 40,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    marginBottom: 15,
    backgroundColor: PPConstants.Color.InputLight,
    justifyContent: 'center',
  },
  textView: {
    fontFamily: PPConstants.Font.Bold,
    fontSize: 13,
    color: PPConstants.Color.TextLight,
  },
});