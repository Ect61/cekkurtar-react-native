import ActionTypes from '../ActionTypes';

const INITIAL_STATE = {
  email: '',
  password: '',
  passwordAgain: '',
  firstname: '',
  lastname: '',
  company: '',
  phone: '',
  error: null,
  loading: false
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type){
    case ActionTypes.REGISTER_INPUT:
      return { ...state, error: null, [action.payload.prop]: action.payload.value };
    case ActionTypes.REGISTER_START:
      return { ...state, ...INITIAL_STATE };
    case ActionTypes.REGISTER:
      return { ...state, loading: true, error: '' };
    case ActionTypes.REGISTER_SUCCESS:
      return { ...state, ...INITIAL_STATE };
    case ActionTypes.REGISTER_ERROR:
      return { ...state, error: null, loading: false };
    default:
      return state;
  }
};