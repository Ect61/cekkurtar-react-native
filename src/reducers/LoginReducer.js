import ActionTypes from '../ActionTypes';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
  loading: false
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type){
    case ActionTypes.LOGIN_INPUT:
      return { ...state, error: null, [action.payload.prop]: action.payload.value };
    case ActionTypes.LOGIN_START:
      return { ...state, ...INITIAL_STATE };
    case ActionTypes.LOGIN:
      return { ...state, loading: true, error: '' };
    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case ActionTypes.LOGIN_ERROR:
      return { ...state, error: null, loading: false };
    default:
      return state;
  }
};