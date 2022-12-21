import ActionTypes from '../ActionTypes';

const INITIAL_STATE = {
  user: null,
  token: null,
  notificationCount: 0
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type){
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload.user, token: action.payload.token };
    case ActionTypes.UPDATE_USER:
      return { ...state, user: action.payload };
    case ActionTypes.SET_NOTIFICATION_COUNT:
      return { ...state, notificationCount: action.payload };
    case ActionTypes.LOGOUT_USER:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
