import React from 'react';
import PPConstants from '../PPConstants';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import Header from '../components/common/Header';

import { Actions } from 'react-native-router-flux';

export default class ItemViewScreen extends React.Component {

  render() {
    let imageUrl = PPConstants.CdnUrl + this.props.attachment.url;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ActivityIndicator size="small" color="#fece00" />
          <Image style={styles.contentImage} source={{ uri: imageUrl }} />
          <Text style={styles.contentTitle}>{ this.props.attachment.name }</Text>
        </View>
        <Header onPressClose={() => Actions.pop()} />
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
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentImage: {
    position: 'absolute',
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    borderRadius: 20,
  },
  contentTitle: {
    position: 'absolute',
    bottom: 30,
    fontFamily: PPConstants.Font.SemiBold,
    width: Dimensions.get('window').width * 0.6,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 22,
    color: '#4e576d',
    padding: 10,
  }
});