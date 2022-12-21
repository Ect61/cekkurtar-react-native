import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';

export default class LoadingContainer extends React.Component {

  render() {
    return (
      <View style={[styles.loadingContainer, this.props.backgroundColor ? { backgroundColor: this.props.backgroundColor } : ""]}>
        <ActivityIndicator size="small" color="#fece00" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  }
});