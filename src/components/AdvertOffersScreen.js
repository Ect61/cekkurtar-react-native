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
import AdvertOfferItem from '../components/common/AdvertOfferItem';
import PPInput from '../components/common/PPInput';
import PPButton from '../components/common/PPButton';

import { Actions } from 'react-native-router-flux';

import { setNotificationCount } from '../actions/Main';

class AdvertOffersScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  selectOffer = ({ offerId }) => {
    this.setState({ loading: true });

    let url = PPConstants.Api.SelectAdvertOffer + this.props.advert.id + "/offer/" + offerId + "?api_token=" + this.props.token;
    console.log(url);

    apiRequest({ url }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        Actions.pop();
        Actions.pop();
        this.props.setNotificationCount({ count: this.props.notificationCount - 1 })
        Actions.advertDetail({ advertId: this.props.advert.id });
      } else {
        this.setState({ loading: false });
      }
    }).catch((error) => {
      console.log("apiRequest error");
      console.log(error);
      this.setState({ loading: false });
      ShowAlertMessage('Hata!', "Hata oluştu lütfen tekrar deneyin.");
    });
  }

  renderAdvertOffersList = () => {
    if(this.props.advert.offers != null && this.props.advert.offers.length > 0){
      let advertOffersListView = this.props.advert.offers.map((advertOfferItem, index) => {
        return (
          <AdvertOfferItem selectAdvertOffer={() => this.selectOffer({ offerId: advertOfferItem.id })} data={advertOfferItem} index={index} key={index} />
        );
      });
      return (
        advertOffersListView
      );
    }

    return (
      <Text style={styles.emptyText}>Talebiniz için gelen teklif bulunamadı.</Text>
    );
  }

  render() {
    if(this.state.loading){
      return (
        <View style={styles.container}>
          <Header onPressBack={() => Actions.pop()} title={"Talep No: #T" + this.props.advert.id + " Gelen Teklifler"} />
          <LoadingContainer />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header onPressBack={() => Actions.pop()} title={"Talep No: #T" + this.props.advert.id + " Gelen Teklifler"} />
        <ScrollView contentContainerStyle={styles.contentContainer} bounces={false} overScrollMode={"never"}>
          <View style={styles.content}>
            { this.renderAdvertOffersList() }
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
  emptyText: {
    fontFamily: PPConstants.Font.Normal,
    color: PPConstants.Color.TextLightest,
    fontSize: 15,
    padding: 20,
    textAlign: 'center'
  },
});

const mapStateToProps = ({ main }) => {
  const { user, token, notificationCount } = main;
  return { user, token, notificationCount };
}

export default connect(mapStateToProps, {
  setNotificationCount
})(AdvertOffersScreen);