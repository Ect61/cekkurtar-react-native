import React from 'react';
import PPConstants from '../PPConstants';
import { logout } from '../PPHelper';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import Header from './common/Header';

import LinearGradient from 'react-native-linear-gradient';

import { Actions } from 'react-native-router-flux';

class MenuScreen extends React.Component {

  renderNotificationCountView = () => {
    if(this.props.notificationCount > 0){
      return (
        <View style={styles.menuCountView}>
          <Text style={styles.menuCountText}>{ this.props.notificationCount }</Text>
        </View>
      );
    }
  }

  renderUserTypeMenuItem = () => {
    if(this.props.userType == 0){
      return (
        <TouchableWithoutFeedback onPress={() => { Actions.advertList() }} underlayColor="white">
          <View style={styles.menuView}>
            <Text style={styles.menuText}>Taleplerim</Text>
            { this.renderNotificationCountView() }
          </View>
        </TouchableWithoutFeedback>
      );
    }

    return (
      <TouchableWithoutFeedback onPress={() => { Actions.offerList() }} underlayColor="white">
        <View style={styles.menuView}>
          <Text style={styles.menuText}>Tekliflerim</Text>
          { this.renderNotificationCountView() }
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <LinearGradient style={styles.container} start={{x: 1, y: 0}} end={{x: 0, y: 0}} colors={["#1569ac", "#03256c"]}>
        <Header onPressClose={() => Actions.pop()} />
        <View style={{ height: 40 }} />
        { this.renderUserTypeMenuItem() }
        <TouchableWithoutFeedback onPress={() => { /* Actions.pop(); */ Actions.editProfile({ userData: this.props.user }) }} underlayColor="white">
          <View style={styles.menuView}>
            <Text style={styles.menuText}>Profilim</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { /* Actions.pop(); */ Actions.about() }} underlayColor="white">
          <View style={styles.menuView}>
            <Text style={styles.menuText}>Hakkımızda</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { /* Actions.pop(); */ Actions.termsOfUse() }} underlayColor="white">
          <View style={styles.menuView}>
            <Text style={styles.menuText}>Kullanım ve Gizlilik</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { logout(); Actions.auth({ type: 'reset' }) }} underlayColor="white">
          <View style={styles.bottomView}>
            <Text style={styles.bottomText}>çıkış yap</Text>
          </View>
        </TouchableWithoutFeedback>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuView: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  menuText: {
    fontFamily: PPConstants.Font.Light,
    color: '#ffffff',
    fontSize: 22,
  },
  menuCountView: {
    position: 'absolute',
    right: 30,
    backgroundColor: PPConstants.Color.Red,
    width: 20,
    height: 20,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  menuCountText: {
    fontFamily: PPConstants.Font.SemiBold,
    fontSize: 12,
    textAlign: 'center',
    color: '#ffffff',
  },
  bottomView: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  bottomText: {
    fontFamily: PPConstants.Font.Light,
    color: '#ffffff',
    fontSize: 14,
  },
});

const mapStateToProps = ({ main }) => {
  const { user, notificationCount } = main;
  return { user, notificationCount };
}

export default connect(mapStateToProps, null)(MenuScreen);
