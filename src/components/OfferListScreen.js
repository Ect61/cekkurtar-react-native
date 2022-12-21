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
import OfferListItem from '../components/common/OfferListItem';
import PPInput from '../components/common/PPInput';
import PPButton from '../components/common/PPButton';

import { Actions } from 'react-native-router-flux';

import { setNotificationCount } from '../actions/Main';

class OfferListScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      offerList: null
    };

    this.getOfferList();
  }

  getOfferList = () => {
    let url = PPConstants.Api.OfferList + "?api_token=" + this.props.token;
    console.log(url);

    apiRequest({ url }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        console.log(response.data);
        this.setState({ loading: false, offerList: response.data });
        this.readOfferList();
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

  readOfferList = () => {
    let url = PPConstants.Api.ReadOffer + "?api_token=" + this.props.token;
    console.log(url);

    apiRequest({ url }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        this.props.setNotificationCount({ count: 0 });
      } else {
      }
    }).catch((error) => {
      console.log("apiRequest error");
      console.log(error);
    });
  }

  renderOfferList = () => {
    if(this.state.offerList != null && this.state.offerList.length > 0){
      let offerListView = this.state.offerList.map((offerItem, index) => {
        return (
          <OfferListItem data={offerItem} key={index} />
        );
      });
      return (
        offerListView
      );
    }

    return (
      <Text style={styles.emptyText}>Hiç teklifiniz bulunmamaktadır.</Text>
    );
  }

  render() {
    if(this.state.loading){
      return (
        <View style={styles.container}>
          <Header onPressBack={() => Actions.pop()} title={"Tekliflerim"} />
          <LoadingContainer />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header onPressBack={() => Actions.pop()} title={"Tekliflerim"} />
        <ScrollView contentContainerStyle={styles.contentContainer} bounces={false} overScrollMode={"never"}>
          <View style={styles.content}>
            { this.renderOfferList() }
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
  const { user, token } = main;
  return { user, token };
}

export default connect(mapStateToProps, {
  setNotificationCount
})(OfferListScreen);