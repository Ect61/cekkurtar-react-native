import React from 'react';
import PPConstants from '../PPConstants';
import { apiRequest } from '../PPHelper';
import { connect } from 'react-redux';
import {
  ScrollView,
  Keyboard,
  Dimensions,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import Header from '../components/common/Header';
import PPButton from '../components/common/PPButton';
import LoadingContainer from '../components/common/LoadingContainer';

import { Actions } from 'react-native-router-flux';
import { setNotificationCount } from '../actions/Main';

class MainScreen extends React.Component {

  constructor(props) {
    super(props);
    Keyboard.dismiss();

    this.getAdvertList({ token: this.props.token });
    this.getSuccessOfferCount({ token: this.props.token });

    this.getAdvertList({ token: this.props.token });
    this.mainTimer = setInterval(() => { 
      this.getSuccessOfferCount({ token: this.props.token });
    }, 60000);
  }

  state = {
    showButton: false,
    selectedAdvert: null,
    loading: true,
    startCarMarker: null,
    startCarMarkerConfirm: false,
    endCarMarker: null,
    endCarMarkerConfirm: false,
  }

  componentWillUnmount() {
    clearInterval(this.mainTimer);
  }

  getAdvertList = ({ token }) => {
    if(token == null){
      return;
    }

    let url = PPConstants.Api.AdvertList + "?api_token=" + token;
    console.log(url);

    apiRequest({ url }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        this.setState({ loading: false, advertList: response.data });
      } else {
        this.setState({ loading: false });
      }
    }).catch((error) => {
      console.log("apiRequest error");
      console.log(error);
    });
  }

  getSuccessOfferCount = ({ token }) => {
    if(token == null){
      return;
    }

    let url = PPConstants.Api.Notifications + "?api_token=" + token;
    console.log(url);

    apiRequest({ url }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        this.props.setNotificationCount({ count: response.data });
      } else {
      }
    }).catch((error) => {
      console.log("apiRequest error");
      console.log(error);
    });
  }

  showNotifications = () => {
    if(this.props.user.user_type == 1){
      Actions.offerList();
    } else {
      Actions.advertList();
    }
  }

  newAdvert = () => {
    this.setState({ startCarMarker: null, startCarMarkerConfirm: false, endCarMarker: null, endCarMarkerConfirm: false });

    /*
    Actions.newAdvert({
      startLocation: {
        longitude: 32.653,
        latitude: 41.213
      },
      endLocation: {
        longitude: 32.753,
        latitude: 41.313
      },
    });
    */

    Actions.newAdvert({
      startLocation: this.state.startCarMarker,
      endLocation: this.state.endCarMarker
    });
  }

  markerIcons = [
    require('../assets/img/marker-car-1.png'),
    require('../assets/img/marker-car-2.png')
  ];

  renderMapData = () => {
    if(this.props.user.user_type == 1){
      return (
        this.renderAdverts()
      )
    }

    if(this.state.startCarMarker == null){
      return;
    }

    let markers = [];
    markers.push(this.state.startCarMarker);

    if(this.state.endCarMarker != null){
      markers.push(this.state.endCarMarker);
    }

    let markerView = markers.map((markerItem, index) => {
      return (
        <Marker key={index} draggable
          coordinate={markerItem}>
          <Image source={this.markerIcons[index]} style={{ width: 34, height: 44 }} />
        </Marker>
      );
    });

    return (
      markerView      
    );
  }

  renderAdverts = () => {
    if(this.state.advertList != null){
      let advertListView = this.state.advertList.map((advertItem, index) => {
        let coords = JSON.parse(advertItem.user_location);
        return (
          <Marker
            key={index}
            coordinate={coords}
            title={"Yolda Kaldım!"}
            description={"Talep No: #T" + advertItem.id}
            onPress={() => this.setState({ showButton: true, selectedAdvert: advertItem }) }>
            <Image source={require('../assets/img/marker-car-0.png')} style={{ width: 34, height: 44 }} />
          </Marker>
        );
      });
      return (
        advertListView
      );
    }
  }

  onPressMap = ({ e }) => {
    if(this.props.user.user_type == 0){
      if(this.state.startCarMarkerConfirm == false){
        this.setState({ startCarMarker: e.nativeEvent.coordinate });
      } else if(this.state.endCarMarkerConfirm == false){
        this.setState({ endCarMarker: e.nativeEvent.coordinate });
      }
    }
  }

  renderButton = () => {
    if(this.props.user.user_type == 0){
      if(this.state.startCarMarker == null){
        return (
          <View style={styles.bottomButtonView}>
            <View style={styles.bottomInfoView}>
              <Text style={styles.bottomInfoText}>Aracınızın bulunduğu konumu seçin.</Text>
            </View>
          </View>
        );
      }
      if(!this.state.startCarMarkerConfirm){
        return (
          <View style={styles.bottomButtonView}>
            <PPButton text="Konumu Onayla" style={styles.bottomButton} gradientStart={PPConstants.Color.BlueLight} gradientEnd={PPConstants.Color.BlueDark} onPress={() => this.setState({ startCarMarkerConfirm: true, endCarMarker: null }) } />
          </View>
        );
      }
      if(this.state.endCarMarker == null){
        return (
          <View style={styles.bottomButtonView}>
            <View style={styles.bottomInfoView}>
              <Text style={styles.bottomInfoText}>Aracınızın çekilmesini istediğiniz konumu seçin.</Text>
            </View>
          </View>
        );
      }
      if(!this.state.endCarMarkerConfirm){
        return (
          <View style={styles.bottomButtonView}>
            <PPButton text="Çekici Çağır" style={styles.bottomButton} gradientStart={PPConstants.Color.BlueLight} gradientEnd={PPConstants.Color.BlueDark} onPress={() => this.newAdvert()} />
          </View>
        );
      }
    }
    if(this.state.advertList != null && this.state.advertList.length == 0){
      return (
        <View style={styles.bottomButtonView}>
          <View style={styles.bottomInfoView}>
            <Text style={styles.bottomInfoText}>Yeni talep bulunamadı.</Text>
          </View>
        </View>
      );
    }
    if(this.state.showButton){
      return (
        <View style={styles.bottomButtonView}>
          <PPButton text="Teklif Gönder" style={styles.bottomButton} gradientStart={PPConstants.Color.BlueLight} gradientEnd={PPConstants.Color.BlueDark} onPress={() => Actions.newOffer({ advert: this.state.selectedAdvert })} />
        </View>
      );
    }
  }

  renderCancel = () => {
    if(this.state.startCarMarker != null){
      return (
        <View style={styles.cancelView}>
          <PPButton text="İptal Et" backgroundColor={"transparent"} textColor={PPConstants.Color.Red} onPress={() => this.setState({ startCarMarker: null, startCarMarkerConfirm: false, endCarMarker: null, endCarMarkerConfirm: false })} />
        </View>
      );
    }
  }

  render = () => {
    if(this.props.loading){
      return (
        <LoadingContainer />
      );
    }

    let coords = {
      latitude: 41.215495,
      longitude: 32.653811,
    }

    return (
      <View style={styles.container}>
        <Header onPressMenu={() => Actions.menu({ userType: this.props.user.user_type }) } title="Çek Kurtar" showNotificationCount onPressRight={() => this.showNotifications()} />
        <View style={styles.content}>
          <MapView
            style={styles.map}
            onPress={(e) => this.onPressMap({ e })}
            initialRegion={{
              latitude: 41.215495,
              longitude: 32.653811,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}>
            { this.renderMapData() }
          </MapView>
        </View>
        { this.renderButton() }
        { this.renderCancel() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
  },
  bottomButtonView: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 20,
    left: 0,
    bottom: 20,
  },
  cancelView: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: -20,
  },
  bottomInfoView: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 20,
  },
  bottomInfoText: {
    fontFamily: PPConstants.Font.SemiBold,
    color: PPConstants.Color.Primary,
    fontSize: 13,
    textAlign: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapStateToProps = ({ main, advert }) => {
  const { user, loading } = main;
  const { advertList } = advert;
  return { user, loading, advertList };
}

export default connect(mapStateToProps, {
  setNotificationCount
})(MainScreen);