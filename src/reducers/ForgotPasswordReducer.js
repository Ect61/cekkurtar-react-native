import ActionTypes from '../ActionTypes';

const INITIAL_STATE = {
  phone: '',
  error: null,
  loading: false
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type){
    case ActionTypes.FORGOTPASSWORD_INPUT:
      return { ...state, error: null, [action.payload.prop]: action.payload.value };
    case ActionTypes.FORGOTPASSWORD_START:
      return { ...state, ...INITIAL_STATE };
    case ActionTypes.FORGOTPASSWORD:
      return { ...state, loading: true, error: '' };
    case ActionTypes.FORGOTPASSWORD_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case ActionTypes.FORGOTPASSWORD_ERROR:
      return { ...state, error: null, loading: false };
    default:
      return state;
  }
};