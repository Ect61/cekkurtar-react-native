import React from 'react';
import PPConstants from '../PPConstants';
import { ShowAlertMessage, GetDistance, apiRequest } from '../PPHelper';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import Header from '../components/common/Header';
import LoadingContainer from '../components/common/LoadingContainer';
import PPInput from '../components/common/PPInput';
import PPButton from '../components/common/PPButton';

import { Actions } from 'react-native-router-flux';

class NewOfferScreen extends React.Component {

  constructor(props) {
    super(props);

    console.log(this.props.advert);
    console.log(this.props.token);

    var userLocation = JSON.parse(this.props.advert.user_location);
    var targetLocation = JSON.parse(this.props.advert.target_location);

    this.state = {
      loading: true,
      sendLoading: false,
      distance: GetDistance(userLocation.latitude, userLocation.longitude, targetLocation.latitude, targetLocation.longitude),
      startLocation: userLocation,
      endLocation: targetLocation,
      price: "",
      advert: null
    };

    this.getAdvertDetail();
  }

  getAdvertDetail = () => {
    let url = PPConstants.Api.AdvertDetail + this.props.advert.id + "?api_token=" + this.props.token;
    console.log(url);

    apiRequest({ url }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        console.log(response.data);
        this.setState({ loading: false, advert: response.data });
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

  sendOffer = () => {
    Keyboard.dismiss();

    if(this.state.price.length < 1){
      ShowAlertMessage("Hata", "Lütfen ücret girin.");
      return;
    }

    if((parseInt(this.state.price) || 0) == 0){
      ShowAlertMessage("Hata", "Lütfen geçerli ücret girin.");
      return;
    }

    this.setState({ sendLoading: true });

    let price = parseInt(this.state.price);

    let url = PPConstants.Api.NewOffer + "?api_token=" + this.props.token + "&advert_id=" + this.props.advert.id + "&price=" + price;
    console.log(url);

    apiRequest({ url }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        this.setState({ sendLoading: false });
        Actions.pop();
        Actions.success({ title: "Başarılı", message: "Teklifiniz araç sahibine gönderildi. Araç sahibi tarafından değerlendirilip tarafınıza bilgi verilecektir." });
      } else {
        this.setState({ sendLoading: false });
      }
    }).catch((error) => {
      console.log("apiRequest error");
      console.log(error);
      this.setState({ sendLoading: false });
      ShowAlertMessage('Hata!', "Hata oluştu lütfen tekrar deneyin.");
    });
  }

  renderStatus = () => {
    if(this.state.advert != null && this.state.advert.offers.length > 0){
      var userOffer = this.state.advert.offers.filter(offerItem => offerItem.user_id === this.props.user.id);
      if(userOffer.length > 0){
        if(userOffer[0].status == 1){
          return (
            <View>
              <PPButton text="Teklifiniz Reddedildi" backgroundColor={PPConstants.Color.Red} />
            </View>
          );
        }

        return (
          <View>
            <PPButton text="Teklifiniz Onay Bekliyor" backgroundColor={PPConstants.Color.Orange} />
          </View>
        );
      }
    }
  }

  renderForm = () => {
    if(this.state.advert != null && this.state.advert.offers.length > 0){
      var userOffer = this.state.advert.offers.filter(offerItem => offerItem.user_id === this.props.user.id);
      if(userOffer.length > 0){
        if(userOffer[0].status == 1){
          return (
            <View style={styles.form}>
              <PPInput
                textView
                label="Fiyatınız (TL)"
                value={userOffer[0].price + " TL"} />
              <PPButton text="Teklifiniz Reddedildi" backgroundColor={PPConstants.Color.Red} />
            </View>
          );
        }

        return (
          <View style={styles.form}>
            <PPInput
              textView
              label="Fiyatınız (TL)"
              value={userOffer[0].price + " TL"} />
            <PPButton text="Teklifiniz Onay Bekliyor" backgroundColor={PPConstants.Color.Orange} />
          </View>
        );
      }
    }

    return (
      <View style={styles.form}>
        <PPInput
          label="Fiyatınız (TL)*"
          placeholder="Fiyatınız (TL)*"
          keyboardType="number-pad"
          onChangeText={value => this.setState({ price: value })}
          value={this.state.price} />
        <PPButton loading={this.state.sendLoading} text="Teklif Ver" gradientStart={PPConstants.Color.BlueLight} gradientEnd={PPConstants.Color.BlueDark} onPress={() => this.sendOffer()} />
      </View>
    );
  }

  renderAdverts = () => {
    return (
      <Marker
        coordinate={this.state.startLocation}>
        <Image source={require('../assets/img/marker-car-0.png')} style={{ width: 34, height: 44 }} />
      </Marker>
    );
  }

  render() {
    if(this.state.loading){
      return (
        <View style={styles.container}>
          <Header onPressBack={() => Actions.pop()} title={"Talep No: #T" + this.props.advert.id + " Detay"} />
          <LoadingContainer />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header onPressBack={() => Actions.pop()} title={"Talep No: #T" + this.props.advert.id + " Detay"} />
        <ScrollView contentContainerStyle={styles.contentContainer} bounces={false} overScrollMode={"never"}>
          <View style={styles.content}>
            { this.renderStatus() }
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.contentText}>Talep Bilgileri: </Text>
            </View>
            <View style={styles.border} />
            <View style={styles.form}>
              <PPInput
                onlyLabel
                label="Araç Resmi" />
              <Image style={styles.carPhoto} source={{ uri: PPConstants.CdnUrl + this.state.advert.advert_photos[0].filename }} />
              <PPInput
                textView
                label="Taşıma Mesafesi"
                placeholder="Taşıma Mesafesi"
                value={this.state.distance + " KM"} />
              <PPInput
                onlyLabel
                label="Araç Alım Konumu" />
              <View style={styles.mapView}>
                <MapView
                  style={styles.map}
                  pitchEnabled={false}
                  rotateEnabled={false}
                  zoomEnabled={false}
                  scrollEnabled={false}
                  initialRegion={{
                    latitude: this.state.startLocation.latitude,
                    longitude: this.state.startLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}>
                  { this.renderAdverts() }
                </MapView>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.contentText}>Teklif Bilgileriniz:</Text>
            </View>
            <View style={styles.border} />
            { this.renderForm() }
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
  forgotText: {
    fontFamily: PPConstants.Font.Normal,
    fontSize: 12,
    lineHeight: 20,
    color: PPConstants.Color.TextLight,
    textAlign: 'center',
  },
  blueText: {
    fontFamily: PPConstants.Font.SemiBold,
    color: PPConstants.Color.Primary,
    fontSize: 15,
  },
  carPhoto: {
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").width - 40,
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
    height: 1,
    backgroundColor: '#ebebeb',
  },
  form: {
    paddingTop: 20,
  },
});

const mapStateToProps = ({ main }) => {
  const { user, token } = main;
  return { user, token };
}

export default connect(mapStateToProps, {
})(NewOfferScreen);