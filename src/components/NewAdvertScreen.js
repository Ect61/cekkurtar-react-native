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
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
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
      loading: false,
      showImageModal: false,
      photo: []
    };

    ImagePicker.clean().then(() => {
      // console.log('ImagePicker temp cleared!');
    }).catch(e => {
      // console.log('ImagePicker temp error!');
    });
  }

  createAdvert = () => {
    Keyboard.dismiss();

    if(this.state.photo.length < 1){
      ShowAlertMessage("Hata", "Lütfen en az 1 resim yükleyin.");
      return;
    }

    let startLocation = JSON.stringify(this.props.startLocation);
    let endLocation = JSON.stringify(this.props.endLocation);
    let photos = this.state.photo;

    this.setState({ loading: true });

    let url = PPConstants.Api.NewAdvert + "?api_token=" + this.props.token;
    console.log(url);

    let formData = new FormData();
    for(let i = 0; i < photos.length; i++){
      let filename = photos[i].path.split('/').pop();
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      formData.append('photo['+ i +']', { uri: photos[i].path, name: filename, type });
    }

    formData.append('user_location', startLocation);
    formData.append('target_location', endLocation);

    apiRequest({ url, formData }).then((response) => {
      console.log("apiRequest response");
      console.log(response);
      if(response != null){
        this.setState({ loading: false });
        Actions.pop();
        Actions.success({ title: "Başarılı", message: "Çekici talebiniz gönderildi. En kısa sürede çekicilerin tekliflerini değerlendirebileceksiniz." });
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

  checkCameraPermissions = async () => {
    var status = "granted";
    if (status !== 'granted') {
      ShowAlertMessage('Hata!', "Araç resmi yükleyebilmek için cihazınızdan kamera erişimine izin verin.");
    } else {
      this.selectImageFromCamera();
    }
  };

  checkGalleryPermissions = async () => {
    var status = "granted";
    if (status !== 'granted') {
      ShowAlertMessage('Hata!', "Araç resmi yükleyebilmek için cihazınızdan galeri erişimine izin verin.");
    } else {
      this.selectImageFromGallery();
    }
  };

  selectImageFromCamera = async () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
      cropperToolbarTitle: "Resmi Düzenle",
    }).then(image => {
      console.log(image);
      let photos = this.state.photo;
      photos.push(image);
      this.setState({ photo: photos });
    });
  };

  selectImageFromGallery = async () => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: true,
      mediaType: 'photo',
      cropperToolbarTitle: "Resmi Düzenle",
    }).then(image => {
      console.log(image);
      let photos = this.state.photo;
      photos.push(image);
      this.setState({ photo: photos });
    });
  };

  removePhoto = ({ index }) => {
    let photos = this.state.photo;
    photos.splice(index, 1);

    this.setState({ photo: photos });
  }

  renderPhotoButton = () => {
    if(this.state.photo.length < 5){
      return (
        <PPButton text="Resim Ekle" backgroundColor={'#ddd'} textColor={PPConstants.Color.Text} onPress={() => this.setState({ showImageModal: true })} />
      );
    }
  }

  renderPhotoItem = (item, index) => {
    return (
      <View style={styles.carImageView}>
        <Image style={styles.carPhoto} source={{ uri: item.item.path }} />
        <TouchableWithoutFeedback onPress={() => { this.removePhoto({ index: index }) }} underlayColor="transparent">
          <View style={styles.carRemove}>
            <Image style={styles.carRemoveImage} source={require('../assets/img/close-red.png')} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderPhotoList = () => {
    if(this.state.photo.length == 0){
      return (
        <Text style={styles.emptyText}>En az 1 resim yüklemeniz gerekmektedir.</Text>
      );
    }

    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent:'space-between' }}
        numColumns={2}
        data={this.state.photo}
        onPressItem={this._onPressItem}
        renderItem={this.renderPhotoItem}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  renderPhotoView = () => {
    if(this.state.photo.length < 5){
      return (
        <View style={styles.form}>
          { this.renderPhotoList() }
          { this.renderPhotoButton() }
        </View>
      );
    }
  }

  render() {
    if(this.state.loading){
      return (
        <View style={styles.container}>
          <Header onPressBack={() => Actions.pop()} title={"Çekici Çağır"} />
          <LoadingContainer />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Header onPressBack={() => Actions.pop()} title={"Çekici Çağır"} />
        <ScrollView contentContainerStyle={styles.contentContainer} bounces={false} overScrollMode={"never"}>
          <View style={styles.content}>
            <View style={styles.form}>
              <PPInput
                onlyLabel
                label="Taşıma Önizlemesi" />
              <View style={styles.mapView}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: this.props.startLocation.latitude,
                    longitude: this.props.startLocation.longitude,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                  }}>
                  <Marker
                    coordinate={this.props.startLocation}>
                    <Image source={require('../assets/img/marker-car-1.png')} style={{ width: 34, height: 44 }} />
                  </Marker>
                  <Marker
                    coordinate={this.props.endLocation}>
                    <Image source={require('../assets/img/marker-car-2.png')} style={{ width: 34, height: 44 }} />
                  </Marker>
                </MapView>
              </View>
            </View>
            <View style={styles.border} />
            <PPInput
              onlyLabel
              label="Araç Resimleri" />
            { this.renderPhotoView() }
            <View style={styles.form}>
              <PPButton loading={this.state.loading} text="Çekici Çağır" gradientStart={PPConstants.Color.BlueLight} gradientEnd={PPConstants.Color.BlueDark} onPress={() => this.createAdvert()} />
            </View>
          </View>
        </ScrollView>
        <Modal
          transparent={true}
          visible={this.state.showImageModal}
          onRequestClose={() => {
            this.setState({ showImageModal: false });
          }}>
          <TouchableWithoutFeedback onPress={() => { this.setState({ showImageModal: false }); }}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Araç Resmi Yükle</Text>
                <TouchableWithoutFeedback onPress={() => { this.checkCameraPermissions(); this.setState({ showImageModal: false }); }}>
                  <View><Text style={styles.modalItem}>Kameradan Resim Çek</Text></View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => { this.checkGalleryPermissions(); this.setState({ showImageModal: false }); }}>
                  <View><Text style={styles.modalItem}>Galeriden Resim Seç</Text></View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
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
  carRemove: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  carRemoveImage: {
    width: 40,
    height: 40,
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
  form: {
    paddingTop: 20,
  },

  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,.7)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    alignSelf: 'stretch',
    borderRadius: 5,
    padding: 20,
    marginHorizontal: 30,
    backgroundColor: '#ffffff'
  },
  modalTitle: {
    alignSelf: 'stretch',
    fontSize: 18,
    fontFamily: PPConstants.Font.SemiBold,
    color: PPConstants.Color.Primary,
    textAlign: 'center',
    paddingBottom: 15,
    borderBottomColor: PPConstants.Color.Primary,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 7,
    fontFamily: PPConstants.Font.SemiBold,
    fontSize: 14,
    color: PPConstants.Color.TextLight,
  },
});

const mapStateToProps = ({ main }) => {
  const { user, token } = main;
  return { user, token };
}

export default connect(mapStateToProps, {
})(NewAdvertScreen);