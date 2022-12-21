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

import { Actions } from 'react-native-router-flux';

export default class OfferListItem extends React.Component {

  advertDetail = () => {
    if(this.props.data.status == 0 && this.props.data.offers.length > 0){
      Actions.advertOffers({ advert: this.props.data });
      return;
    }
    Actions.advertDetail({ advertId: this.props.data.id });
  }

  renderNew = () => {
    if(this.props.data.status == 0 && this.props.data.offers.length > 0){
      return <View style={styles.newItem} />;
    }
  }

  renderStatus = () => {
    if(this.props.data.status == 1){
      return <Text style={[styles.status, { color: 'green'} ]}>İşlem Tamamlandı</Text>;
    } else if(this.props.data.status == 0 && this.props.data.offers.length > 0){
      return <Text style={[styles.status, { color: 'orange'} ]}>Onayınız Bekleniyor</Text>;
    } else if(this.props.data.status == 0){
      return <Text style={[styles.status, { color: 'orange'} ]}>Teklifler Bekleniyor</Text>;
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.advertDetail()} underlayColor="transparent">
        <View style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Talep No: #T{ this.props.data.id }</Text>
            { this.renderStatus() }
            <Image style={styles.photo} source={{ uri: PPConstants.CdnUrl + this.props.data.advert_photos[0].filename }} />
            <View style={styles.description}>
              <Text style={styles.price}>{ this.props.data.offers.length > 0 ? this.props.data.offers.length + " Çekici Teklifi" : "Teklif Bekleniyor" }</Text>
              <Text style={styles.date}>Talep Tarihi: <Moment format={"DD/MM/YYYY - HH:mm:ss"} element={Text}>{ this.props.data.created_at }</Moment></Text>
            </View>
          </View>
          { this.renderNew() }
          <View style={styles.border} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 110,
    minHeight: 130,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  photo: {
    position: 'absolute',
    top: 30,
    left: 0,
    width: 100,
    height: 100,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#999',
  },
  title: {
    fontFamily: PPConstants.Font.SemiBold,
    fontSize: 14,
    color: PPConstants.Color.Text,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  status: {
    fontFamily: PPConstants.Font.SemiBold,
    fontSize: 14,
    color: PPConstants.Color.Text,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  newItem: {
    position: 'absolute',
    width: 30,
    height: 30,
    top: 63,
    left: -15,
    borderRadius: 15,
    backgroundColor: 'orange',
  },
  description: {
    paddingTop: 20,
  },
  price: {
    fontFamily: PPConstants.Font.SemiBold,
    fontSize: 18,
    color: PPConstants.Color.Text,
  },
  date: {
    paddingTop: 5,
    fontFamily: PPConstants.Font.SemiBold,
    fontSize: 11,
    color: PPConstants.Color.Text,
  },
  border: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 20,
    marginBottom: 20,
  }
});