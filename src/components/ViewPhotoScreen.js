import React from 'react';
import PPConstants from '../PPConstants';
import {
  Keyboard,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';

import Header from '../components/common/Header';
import ZoomableImage from '../components/common/ZoomableImage';

import { Actions } from 'react-native-router-flux';

export default class ViewPhotoScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <ZoomableImage
            imageWidth={Dimensions.get('window').width - 20}
            imageHeight={Dimensions.get('window').width - 20}
            style={styles.image}
            source={{ uri: this.props.imageUrl }} />
        </View>
        <View style={styles.header}>
          <Header onPressBack={() => Actions.pop()} title="Araç Görseli" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PPConstants.Color.White,
    alignItems: 'stretch'
  },
  header: {
    position: 'absolute',
    top: 0
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').width - 20,
    borderRadius: 20,
  }
});