import React from 'react';
import PPConstants from '../PPConstants';
import { ShowAlertMessage, apiRequest } from '../PPHelper';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import Header from '../components/common/Header';
import LoadingContainer from '../components/common/LoadingContainer';
import PPInput from '../components/common/PPInput';
import PPButton from '../components/common/PPButton';

import { Actions } from 'react-native-router-flux';

class NewAdvertScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      advert: null
    };

    this.getAdvertDetail();
  }

  getAdvertDetail = () => {
    let url = PPConstants.Api.AdvertDetail + this.props.advertId + "?api_token=" + this.props.token;
    console.log(url);

    apiRequest({ url }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        console.log(response.data);
        this.setState({
          loading: false,
          advert: response.data,
          startLocation: JSON.parse(response.data.user_location),
          endLocation: JSON.parse(response.data.target_location),
        });
      } else {
        this.setState({ loading: true });
        ShowAlertMessage('Hata!', "Hata oluştu.");
      }
    }).catch((error) => {
      console.log("apiRequest error");
      console.log(error);
      this.setState({ loading: true });
      ShowAlertMessage('Hata!', "Hata oluştu.");
    });
  }

  renderPhotoItem = (item, index) => {
    return (
      <TouchableWithoutFeedback onPress={() => Actions.viewPhoto({ imageUrl: PPConstants.CdnUrl + item.item.filename })} underlayColor="transparent">
        <View style={styles.carImageView}>
          <Image style={styles.carPhoto} source={{ uri: PPConstants.CdnUrl + item.item.filename }} />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderPhotoList = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent:'space-between' }}
        numColumns={2}
        data={this.state.advert.advert_photos}
        onPressItem={this._onPressItem}
        renderItem={this.renderPhotoItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  renderStatus = () => {
    if(this.props.user.user_type == 1){
      return (
        <View>
          <PPButton text="Teklifiniz Onaylandı" backgroundColor={PPConstants.Color.Green} />
        </View>
      );
    }

    if(this.state.advert.status == 0){
      return (
        <View>
          <PPButton text="Teklifler Bekleniyor" backgroundColor={PPConstants.Color.Orange} />
        </View>
      );
    }

    return (
      <View>
        <PPButton text="Talebiniz Tamamlandı" backgroundColor={PPConstants.Color.Green} />
      </View>
    );
  }

  renderForm = () => {
    if(this.state.advert.status == 0){
      return;
    }

    let selectedOffer = this.state.advert.offers.filter((offerItem) => offerItem.status === 2)[0];

    if(this.props.user.user_type == 1){
      return (
        <View style={styles.form}>
          <PPInput
            textView
            label="Araç Sahibi Adı Soyadı"
            value={this.state.advert.user.fullname} />
          <PPInput
            textView
            label="Araç Sahibi Telefon Numarası"
            value={this.state.advert.user.phone} />
          <PPInput
            textView
            label="Araç Sahibi E-Mail Adresi"
            value={this.state.advert.user.email} />
          <PPInput
            textView
            label="Taşıma Bedeli (TL)"
            value={selectedOffer.price + " TL"} />
        </View>
      );
    }

    return (
      <View style={styles.form}>
        <PPInput
          textView
          label="Çekici Adı Soyadı"
          value={selectedOffer.user.fullname} />
        <PPInput
          textView
          label="Çekici Telefon Numarası"
          value={selectedOffer.user.phone} />
        <PPInput
          textView
          label="Çekici E-Mail Adresi"
          value={selectedOffer.user.email} />
        <PPInput
          textView
          label="Taşıma Bedeli (TL)"
          value={selectedOffer.price + " TL"} />
      </View>
    );
  }

  renderInfo = () => {
    if(this.props.user.user_type == 1){
      return (
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Araç sahibi ile iletişime geçip buluşma noktasında buluşun. Çekici işlemi bittiği zaman ücretinizi alabilirsiniz.</Text>
        </View>
      );
    }

    if(this.state.advert.status == 0){
      return (
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Çekicilerden teklif bekleniyor. Gelen tekliflerin arasından size en uygun olanı seçip iletişime geçebileceksiniz.</Text>
        </View>
      );
    } else if(this.state.advert.status == 1){
      return (
        <View style={styles.infoView}>
          <Text style={styles.infoText}>Çekici teklifini kabul ettiniz. Çekici en kısa sürede adresinize ulaşacaktır. Yukarıdaki bilgiler ile iletişime geçebilirsiniz. Çekici ücretini çekim işlemi bittikten sonra ödeyebilirsiniz.</Text>
        </View>
      );
    }
  }

  render() {
    if(this.state.loading || this.state.advert == null){
      return (
        <View style={styles.container}>
          <Header onPressBack={() => Actions.pop()} title={"Talep Detayı"} />
          <LoadingContainer />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header onPressBack={() => Actions.pop()} title={"Talep No: #T" + this.state.advert.id + " Detay"} />
        <ScrollView contentContainerStyle={styles.contentContainer} bounces={false} overScrollMode={"never"}>
          <View style={styles.content}>
            { this.renderStatus() }
            { this.renderForm() }
            <View style={styles.form}>
              <PPInput
                onlyLabel
                label="Taşıma Önizlemesi" />
              <View style={styles.mapView}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: this.state.startLocation.latitude,
                    longitude: this.state.startLocation.longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                  }}>
                  <Marker
                    coordinate={this.state.startLocation}>
                    <Image source={require('../assets/img/marker-car-1.png')} style={{ width: 34, height: 44 }} />
                  </Marker>
                  <Marker
                    coordinate={this.state.endLocation}>
                    <Image source={require('../assets/img/marker-car-2.png')} style={{ width: 34, height: 44 }} />
                  </Marker>
                </MapView>
              </View>
            </View>
            <View style={styles.border} />
            <PPInput
              onlyLabel
              label="Araç Resimleri" />
            { this.renderPhotoList() }
            { this.renderInfo() }
          </View>
        </ScrollView>
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
    width: '100%',
  },
  contentContainer: {
    width: Dimensions.get('window').width,
    padding: 20,
    alignItems: 'stretch'
  },
  contentText: {
    fontFamily: PPConstants.Font.Normal,
    color: PPConstants.Color.TextLightest,
    fontSize: 15,
  },
  emptyText: {
    fontFamily: PPConstants.Font.Normal,
    fontSize: 12,
    lineHeight: 20,
    paddingBottom: 20,
    color: PPConstants.Color.TextLight,
    textAlign: 'center',
  },
  carImageView: {
    width: (Dimensions.get("window").width - 60) / 2,
    height: (Dimensions.get("window").width - 60) / 2,
    marginBottom: 20,
  },
  carPhoto: {
    width: (Dimensions.get("window").width - 60) / 2,
    height: (Dimensions.get("window").width - 60) / 2,
    borderWidth: 5,
    borderColor: '#999',
    borderRadius: 10,
    marginBottom: 20,
  },
  mapView: {
    height: 200,
    marginBottom: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  border: {
    marginTop: 15,
    marginBottom: 15,
    height: 1,
    backgroundColor: '#ebebeb',
  },
  infoView: {
    marginTop: 20,
    marginBottom: 40,
    padding: 15,
    backgroundColor: PPConstants.Color.PrimaryLight,
    borderRadius: 10,
  },
  infoText: {
    fontFamily: PPConstants.Font.Normal,
    fontSize: 14,
    lineHeight: 20,
    color: '#fff',
    textAlign: 'center',
  }
});

const mapStateToProps = ({ main }) => {
  const { user, token } = main;
  return { user, token };
}

export default connect(mapStateToProps, {
})(NewAdvertScreen);