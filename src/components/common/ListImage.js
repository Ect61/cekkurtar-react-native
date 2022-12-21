import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Image from 'react-native-image-progress';
import AutoHeightImage from 'react-native-auto-height-image';

export default class ListImage extends React.Component {
  state = {
    showImage: false
  };

  render(){
    const { showImage } = this.state;
    if(showImage){
      return (
        <View>
          <AutoHeightImage
            source={{ uri: this.props.path }}
            width={Dimensions.get('window').width - 30} />
        </View>
      );
    }

    return (
      <View>
        <Image
          source={{ uri: this.props.path }}
          indicator={ActivityIndicator}
          indicatorProps={{
            color: '#92bb01',
          }}
          onLoad={() => { this.setState({ showImage: true }) }}
          style={styles.listImage} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listImage: {
    width: Dimensions.get('window').width - 30,
    height: 100
  },
});