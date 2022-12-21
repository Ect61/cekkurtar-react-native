import ActionTypes from '../ActionTypes';

const INITIAL_STATE = {
  logoLoading: false,
  addAttachmentLoading: false,
  saveProfileLoading: false
};

export default(state = INITIAL_STATE, action) => {
  switch (action.type){
    case ActionTypes.EDITLOGO_START:
      return { ...state, logoLoading: false };
    case ActionTypes.EDITLOGO:
      return { ...state, logoLoading: true };
    case ActionTypes.EDITLOGO_SUCCESS:
      return { ...state, logoLoading: false };
    case ActionTypes.EDITLOGO_ERROR:
      return { ...state, logoLoading: false };
    
    case ActionTypes.SAVEPROFILE:
      return { ...state, saveProfileLoading: true };
    case ActionTypes.SAVEPROFILE_SUCCESS:
      return { ...state, saveProfileLoading: false };
    case ActionTypes.SAVEPROFILE_ERROR:
      return { ...state, saveProfileLoading: false };

    case ActionTypes.ADDATTACHMENT_START:
      return { ...state, addAttachmentLoading: false };
    case ActionTypes.ADDATTACHMENT:
      return { ...state, addAttachmentLoading: true };
    case ActionTypes.ADDATTACHMENT_SUCCESS:
      return { ...state, addAttachmentLoading: false };
    case ActionTypes.ADDATTACHMENT_ERROR:
      return { ...state, addAttachmentLoading: false };
    default:
      return state;
  }
};