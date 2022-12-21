const baseUrl = 'http://213.142.130.230/';

const apiUrl = baseUrl + 'public/api/';
const cdnUrl = baseUrl + 'storage/app/public/';

export default {
  Token: null,
  BaseUrl: baseUrl,
  ApiUrl: apiUrl,
  CdnUrl: cdnUrl,
  Regex: {
    Mail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  Api: {
    // Auth
    Login: apiUrl + 'auth/login',
    Register: apiUrl + 'auth/register',
    ForgotPassword: apiUrl + 'auth/forgot-password',

    // User
    Profile: apiUrl + 'user/profile',
    Notifications: apiUrl + 'user/notifications',
    EditProfile: apiUrl + 'user/edit',
    ChangePassword: apiUrl + 'user/change-password',

    // Advert
    NewAdvert: apiUrl + 'advert/new',
    AdvertList: apiUrl + 'advert/list',
    AdvertDetail: apiUrl + 'advert/', // + ID
    SelectAdvertOffer: apiUrl + 'advert/', // + ID + /offer/ + OFFERID

    // Offer
    NewOffer: apiUrl + 'offer/new',
    OfferList: apiUrl + 'offer/list',
    ReadOffer: apiUrl + 'offer/read',
    SuccessOfferCount: apiUrl + 'offer/success_count',
  },
  Font: {
    Light: 'ProximaNovaLight',
    Normal: 'ProximaNovaReg',
    SemiBold: 'ProximaNovaSbold',
    Bold: 'ProximaNovaBold',
  },
  Color: {
    White: '#ffffff',
    Black: '#000000',
    Primary: '#08367c',
    PrimaryDark: '#03256c',
    PrimaryLight: '#1467a9',

    Red: '#EA4E3E',
    Orange: '#ea873e',
    Green: '#34a914',

    Text: '#222',
    TextLight: '#666',
    Border: '#CCC',
  }
};
