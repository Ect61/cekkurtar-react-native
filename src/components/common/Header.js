import React from 'react';
import { connect } from 'react-redux';
import PPConstants from "../../PPConstants";
import {
  View,
  StyleSheet,
  Text,
  Keyboard,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import { Actions } from 'react-native-router-flux';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  onPressBack = () => {
    Actions.pop();
  }

  renderLeft(){
    if(this.props.onPressBack){
      if(this.props.left){
        return (
          <View style={styles.headerLeft}>
            <View>
              <TouchableWithoutFeedback onPress={this.props.onPressBack || this.onPressBack} underlayColor="transparent">
                <View style={styles.headerLeftView}>
                  <Text style={styles.headerLeftText}>{this.props.left}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
        );
      }
      return (
        <View style={styles.headerLeft}>
          <TouchableWithoutFeedback onPress={this.props.onPressBack || this.onPressBack} underlayColor="transparent">
            <View style={styles.headerLeftView}>
              <Image style={styles.headerLeftImage} source={require('../../assets/img/back.png')} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
    if(this.props.onPressClose){
      return (
        <View style={styles.headerLeft}>
          <TouchableWithoutFeedback onPress={this.props.onPressClose} underlayColor="transparent">
            <View style={styles.headerLeftView}>
              <Image style={styles.headerLeftImage} source={require('../../assets/img/close.png')} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
    if(this.props.onPressMenu){
      return (
        <View style={styles.headerLeft}>
          <TouchableWithoutFeedback onPress={this.props.onPressMenu} underlayColor="transparent">
            <View style={styles.headerLeftView}>
              <Image style={styles.headerLeftImage} source={require('../../assets/img/menu.png')} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }

  renderTitle(){
    if(this.props.title){
      return (
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>{this.props.title}</Text>
        </View>
      );
    }
  }

  renderRight(){
    if(this.props.showNotificationCount){
      return (
        <View style={styles.headerRight}>
          <TouchableWithoutFeedback onPress={this.props.onPressRight} underlayColor="transparent">
            <View style={styles.headerRightView}>
              <Image style={styles.headerRightImage} source={require('../../assets/img/notification.png')} />
              { this.props.notificationCount > 0 &&
              <Text style={styles.headerRightNotification}>{ this.props.notificationCount }</Text> }
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }

    if(this.props.right && this.props.onPressRight){
      return (
        <View style={styles.headerRight}>
          <TouchableWithoutFeedback onPress={this.props.onPressRight} underlayColor="transparent">
            <View style={styles.headerRightView}>
              <Text style={styles.headerRightText}>{ this.props.right }</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }

  renderPageTitle(){
    if(this.props.pageTitle){
      return (
        <View style={styles.headerPageTitleView}>
          <Text style={styles.headerPageTitleText}>{ this.props.pageTitle }</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <LinearGradient start={{x: 1, y: 0}} end={{x: 0, y: 0}} colors={["#1569ac", "#03256c"]}>
        <View style={[
          styles.header,
          this.props.backgroundColor ? { backgroundColor: this.props.backgroundColor } : '',
          this.props.borderColor ? { borderBottomWidth: 1, borderBottomColor: this.props.borderColor } : '',
          ]}>
          { this.renderTitle() }
          { this.renderLeft() }
          { this.renderRight() }
        </View>
        { this.renderPageTitle() }
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    width: Dimensions.get('window').width,
    height: 50,
    flexDirection: 'row',
  },
  headerLeft: {
    position: 'absolute',
    left: 0,
    justifyContent: 'center',
    height: 50,
  },
  headerLeftView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  headerCloseView: {
    width: 40,
    height: 40,
    marginLeft: 10
  },
  headerCloseImage: {
    width: 40,
    height: 40,
  },
  headerLeftText: {
    fontFamily: PPConstants.Font.Normal,
    fontSize: 14,
    paddingLeft: 15,
    color: '#fe9601'
  },
  headerLeftTextGreen: {
    fontFamily: PPConstants.Font.Normal,
    fontSize: 14,
    paddingLeft: 2,
    color: '#97bf25',
  },
  headerMainImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 15,
  },
  headerMainTextView: {
    paddingLeft: 10,
  },
  headerMainText: {
    fontFamily: PPConstants.Font.SemiBold,
    fontSize: 14,
    color: PPConstants.Color.White
  },
  headerMainTextSM: {
    fontFamily: PPConstants.Font.Normal,
    fontSize: 13,
    color: PPConstants.Color.White
  },
  headerLeftImage: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  headerTitle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleLogo: {
    width: 160,
    height: 40
  },
  headerTitleText: {
    fontFamily: PPConstants.Font.SemiBold,
    fontWeight: 'normal',
    fontSize: 16,
    color: PPConstants.Color.White
  },
  headerRight: {
    position: 'absolute',
    right: 0,
    justifyContent: 'center',
    height: 50,
  },
  headerRightView: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  headerRightText: {
    fontFamily: PPConstants.Font.SemiBold,
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 15,
    paddingLeft: 5,
    color: PPConstants.Color.Blue
  },
  headerRightIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  headerRightImage: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  headerRightNotification: {
    position: 'absolute',
    top: 8,
    right: 11,
    fontFamily: PPConstants.Font.Bold,
    backgroundColor: '#cc0001',
    color: '#ffffff',
    fontSize: 12,
    width: 18,
    height: 18,
    borderRadius: 9,
    textAlign: 'center',
    lineHeight: 18,
  },
  headerPageTitleText: {
    fontFamily: PPConstants.Font.SemiBold,
    fontWeight: 'normal',
    fontSize: 30,
    paddingTop: 5,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
    color: PPConstants.Color.White
  },
});

const mapStateToProps = ({ main }) => {
  const { notificationCount } = main;
  return { notificationCount };
}

export default connect(mapStateToProps, null)(Header);