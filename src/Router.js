import React from 'react';
import { Scene, Router } from 'react-native-router-flux';

// Start
import StartScreen from './components/StartScreen';

// Auth
import AuthScreen from './components/AuthScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';

// Main
import MainScreen from './components/MainScreen';
import MenuScreen from './components/MenuScreen';

// Advert & Offer
import NewAdvertScreen from './components/NewAdvertScreen';
import AdvertDetailScreen from './components/AdvertDetailScreen';
import AdvertListScreen from './components/AdvertListScreen';
import AdvertOffersScreen from './components/AdvertOffersScreen';
import NewOfferScreen from './components/NewOfferScreen';
import OfferListScreen from './components/OfferListScreen';

// Profile
import EditProfileScreen from './components/EditProfileScreen';
import ChangePasswordScreen from './components/ChangePasswordScreen';

// Static
import ViewPhotoScreen from './components/ViewPhotoScreen';
import SuccessScreen from './components/SuccessScreen';
import AboutScreen from './components/AboutScreen';
import TermsOfUseScreen from './components/TermsOfUseScreen';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>

        <Scene key="start" component={StartScreen} />

        <Scene key="auth" hideNavBar>
          <Scene key="auth" component={AuthScreen} />
          <Scene key="forgotPassword" component={ForgotPasswordScreen} />
          <Scene key="login" component={LoginScreen} />
          <Scene key="register" component={RegisterScreen} />
        </Scene>

        <Scene key="main" component={MainScreen} />
        <Scene key="newAdvert" component={NewAdvertScreen} />
        <Scene key="advertList" component={AdvertListScreen} />
        <Scene key="advertDetail" component={AdvertDetailScreen} />
        <Scene key="advertOffers" component={AdvertOffersScreen} />

        <Scene key="viewPhoto" component={ViewPhotoScreen} />

        <Scene key="newOffer" component={NewOfferScreen} />
        <Scene key="offerList" component={OfferListScreen} />

        <Scene key="editProfile" component={EditProfileScreen} />
        <Scene key="changePassword" component={ChangePasswordScreen} />

        <Scene key="menu" component={MenuScreen} />
        <Scene key="success" component={SuccessScreen} />
        <Scene key="about" component={AboutScreen} />
        <Scene key="termsOfUse" component={TermsOfUseScreen} />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
