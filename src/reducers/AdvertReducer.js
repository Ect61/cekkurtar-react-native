import ActionTypes from '../ActionTypes';

const INITIAL_STATE = {
  advertList: null,
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type){
    case ActionTypes.SET_ADVERT_LIST:
      return { ...state, advertList: action.payload };
    default:
      return state;
  }
};
