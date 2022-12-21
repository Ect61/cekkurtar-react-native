import React from 'react';
import PPConstants from "../../PPConstants";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Moment from 'react-moment';
import 'moment/locale/tr';

import PPButton from './PPButton';

import { Actions } from 'react-native-router-flux';

export default class AdvertOfferItem extends React.Component {

  selectOffer = () => {
    if(this.state.selected == false){
      this.setState({ selected: true });
      return;
    }

    this.props.selectAdvertOffer({ offerId: this.props.data.id });
  }

  state = {
    selected: false
  }

  renderButton = () => {
    if(this.state.selected == false){
      return (
        <PPButton text="Bu Teklifi Seç" gradientStart={PPConstants.Color.PrimaryLight} gradientEnd={PPConstants.Color.PrimaryLight} onPress={() => this.selectOffer()} />
      );
    }

    return (
      <View>
        <PPButton text="Onayla" gradientStart={PPConstants.Color.Green} gradientEnd={PPConstants.Color.Green} onPress={() => this.selectOffer()} />
        <Text style={styles.info}>Teklifi onayladıktan sonra diğer teklifi veren çekiciler ile irtibata geçemezsiniz.</Text>
      </View>
    );
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.selectOffer()} underlayColor="transparent">
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.index}>{ this.props.index + 1 }</Text>
            <Image style={styles.towIcon} source={require('../../assets/img/tow.png')} />
            <View style={styles.right}><Text style={styles.priceLabel}>Teklif: </Text><Text style={styles.priceText}>{ this.props.data.price } TL</Text></View>
          </View>
          { this.renderButton() }
          <View style={styles.border} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 50,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  towIcon: {
    width: 40,
    height: 30,
  },
  index: {
    fontFamily: PPConstants.Font.Bold,
    fontSize: 60,
    lineHeight: 60,
    color: PPConstants.Color.Text,
    position: 'absolute',
    left: 0,
    bottom: 0,
  },
  right: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
  priceLabel: {
    fontFamily: PPConstants.Font.SemiBold,
    fontSize: 14,
    color: PPConstants.Color.Text,
  },
  priceText: {
    fontFamily: PPConstants.Font.SemiBold,
    fontSize: 26,
  },
  info: {
    fontFamily: PPConstants.Font.Normal,
    fontSize: 14,
    lineHeight: 20,
    backgroundColor: PPConstants.Color.Orange,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    padding: 15,
    borderRadius: 10
  },
  border: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 20,
  }
});