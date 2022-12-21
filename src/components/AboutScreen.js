import React from 'react';
import PPConstants from '../PPConstants';
import {
  ScrollView,
  View,
  Text,
  Linking,
  Dimensions,
  StatusBar,
  StyleSheet,
  Image,
} from 'react-native';

import Header from '../components/common/Header';
import PPButton from '../components/common/PPButton';

import { Actions } from 'react-native-router-flux';

export default class AboutScreen extends React.Component {

  sendMail = () => {
    let email = "info@cekkurtar.com";
    Linking.openURL('mailto://' + email + '&subject=CekKurtar&body=Mesajınız');
  }

  callCustomerService = () => {
    let phoneNumber = "+90 850 222 2222";
    Linking.openURL(`tel:${phoneNumber}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header onPressBack={() => Actions.pop()} title="Hakkımızda" />
        <ScrollView contentContainerStyle={styles.contentContainer} bounces={false} overScrollMode={"never"}>
          <View style={styles.content}>
            <Image style={styles.appIcon} source={require('../assets/img/icon.png')} />
            <Text style={styles.appTitle}>Çek Kurtar</Text>
            <Text style={styles.contentTextTitle}>Araç sahibi ve çekiciyi hızlı ve güvenilir şekilde buluşturan yol yardım platformu.</Text>
            <Text style={styles.contentText}>Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.</Text>
            <Text style={styles.contentText}>Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.</Text>
            <Text style={styles.contentText}>Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.</Text>
            <Text style={styles.contentText}>Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.</Text>
            <Text style={styles.contentText}>Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.</Text>
            <Text style={styles.contentText}>Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.</Text>
          </View>
        </ScrollView>
        <View style={styles.bottomButtonView}>
          <PPButton text="E-Mail Gönder" gradientStart={PPConstants.Color.BlueLight} gradientEnd={PPConstants.Color.BlueDark} onPress={() => this.sendMail()} />
          <PPButton text="Müşteri Hizmetlerini Ara" gradientStart={PPConstants.Color.BlueLight} gradientEnd={PPConstants.Color.BlueDark} onPress={() => this.callCustomerService()} />
        </View>
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
    paddingBottom: 120,
  },
  contentContainer: {
    width: Dimensions.get('window').width,
    padding: 20,
    alignItems: 'stretch'
  },
  appIcon: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginBottom: 10
  },
  appTitle: {
    fontFamily: PPConstants.Font.Bold,
    color: PPConstants.Color.Text,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  contentTextTitle: {
    fontFamily: PPConstants.Font.SemiBold,
    color: PPConstants.Color.Text,
    fontSize: 14,
    marginBottom: 20,
  },
  contentText: {
    fontFamily: PPConstants.Font.Normal,
    color: PPConstants.Color.TextLighter,
    lineHeight: 20,
    fontSize: 13,
    marginBottom: 20,
  },
  contentTextBold: {
    fontFamily: PPConstants.Font.Normal,
    color: PPConstants.Color.TextLighter,
    lineHeight: 20,
    fontSize: 13,
    marginBottom: 20,
  },
  bottomButtonView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#ffffff',
  }
});
