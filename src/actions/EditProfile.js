import ActionTypes from '../ActionTypes';
import { getToken } from '../Authentication';
import PPConstants from '../PPConstants';
import { ShowAlertMessage } from '../PPHelper';
import { getCompanyInfo } from './Main';
import { Actions } from 'react-native-router-flux';

export const editLogoStart = () => {
  return {
    type: ActionTypes.EDITLOGO_START
  }
}

export const addAttachmentStart = () => {
  return {
    type: ActionTypes.ADDATTACHMENT_START
  }
}

// -------------------------- EDIT LOGO --------------------------

export const editLogo = ({ pickerResult }) => {

  return (dispatch) => {

    console.log("editLogo");
    console.log("pickerResult");
    console.log(pickerResult);

    dispatch({ type: ActionTypes.EDITLOGO });

    getToken().then((res) => {
      if(res){
        var token = res['token'];

        let formData = new FormData();

        if(pickerResult != null){
          let imagePath = pickerResult.path;
          console.log("imagePath");
          console.log(imagePath);

          let filename = imagePath.split('/').pop();
          console.log("filename");
          console.log(filename);

          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          console.log("type");
          console.log(type);

          formData.append('name', 'LOGO');
          formData.append('type', '1');
          formData.append('file', { uri: imagePath, name: filename, type });
        } else {
          console.log("EDITLOGO_ERROR 0");
          ShowAlertMessage('Hata!', 'Lütfen yüklemek istediğiniz resmi seçin.');
          dispatch({ type: ActionTypes.EDITLOGO_ERROR });
          return;
        }

        console.log(formData);

        let apiUrl = PPConstants.Api.CompanyAttachment;
        console.log(apiUrl);

        token = "Bearer " + token;
        console.log(token);
        fetch(apiUrl, {
          method: 'POST',
          body: formData,
          headers: {
            "Authorization": token,
            Accept: 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
            enctype: "multipart/form-data",
          },
        },
        ).then(response => {
          console.log(response);
          response.json().then(json => {
            console.log("response json -> " + JSON.stringify(json));
            if(json.status.code == 200 || json.status.code == 201){
              console.log("EDITLOGO_SUCCESS");
              dispatch({
                type: ActionTypes.EDITLOGO_SUCCESS
              });
              dispatch(getCompanyInfo({ token }));
              Actions.pop();
              return;
            } else {
              console.log("EDITLOGO_ERROR 1");
              dispatch({ type: ActionTypes.EDITLOGO_ERROR });
              ShowAlertMessage('Hata!', 'Hata oluştu lütfen tekrar deneyin.');
              return;
            }
          }).catch((error) => {
            console.log("EDITLOGO_ERROR 2");
            dispatch({ type: ActionTypes.EDITLOGO_ERROR });
            ShowAlertMessage('Hata!', 'Hata oluştu lütfen tekrar deneyin.');
            return;
          });
        });
      } else {
        console.log("EDITLOGO_ERROR 3");
        dispatch({ type: ActionTypes.EDITLOGO_ERROR });
        ShowAlertMessage('Hata!', 'Hata oluştu lütfen tekrar deneyin.');
        return;
      }
    });
  }
};

// -------------------------- ADD ATTACHMENT --------------------------

export const addAttachment = ({ attachmentTitle, attachmentType, pickerResult }) => {

  return (dispatch) => {

    console.log("addAttachment");

    dispatch({ type: ActionTypes.ADDATTACHMENT });

    getToken().then((res) => {
      if(res){
        var token = res['token'];

        let formData = new FormData();

        if(pickerResult != null){
          let imagePath = pickerResult.path;
          console.log("imagePath");
          console.log(imagePath);

          let filename = imagePath.split('/').pop();
          console.log("filename");
          console.log(filename);

          let match = /\.(\w+)$/.exec(filename);
          let type = match ? `image/${match[1]}` : `image`;
          console.log("type");
          console.log(type);

          formData.append('name', attachmentTitle);
          formData.append('type', attachmentType);
          formData.append('file', { uri: imagePath, name: filename, type });
        } else {
          console.log("ADDATTACHMENT_ERROR 0");
          ShowAlertMessage('Hata!', 'Lütfen yüklemek istediğiniz resmi seçin.');
          dispatch({ type: ActionTypes.ADDATTACHMENT_ERROR });
          return;
        }

        console.log(formData);

        let apiUrl = PPConstants.Api.CompanyAttachment;
        console.log(apiUrl);

        token = "Bearer " + token;
        console.log(token);
        fetch(apiUrl, {
          method: 'POST',
          body: formData,
          headers: {
            "Authorization": token,
            Accept: 'multipart/form-data',
            'Content-Type': 'multipart/form-data',
            enctype: "multipart/form-data",
          },
        },
        ).then(response => {
          console.log(response);
          response.json().then(json => {
            console.log("response json -> " + JSON.stringify(json));
            if(json.status.code == 200 || json.status.code == 201){
              console.log("ADDATTACHMENT_SUCCESS");
              dispatch({
                type: ActionTypes.ADDATTACHMENT_SUCCESS
              });
              dispatch(getCompanyInfo({ token }));
              Actions.pop();
              return;
            } else {
              console.log("ADDATTACHMENT_ERROR 1");
              dispatch({ type: ActionTypes.ADDATTACHMENT_ERROR });
              ShowAlertMessage('Hata!', 'Hata oluştu lütfen tekrar deneyin.');
              return;
            }
          }).catch((error) => {
            console.log("ADDATTACHMENT_ERROR 2");
            dispatch({ type: ActionTypes.ADDATTACHMENT_ERROR });
            ShowAlertMessage('Hata!', 'Hata oluştu lütfen tekrar deneyin.');
            return;
          });
        });
      } else {
        console.log("ADDATTACHMENT_ERROR 3");
        dispatch({ type: ActionTypes.ADDATTACHMENT_ERROR });
        ShowAlertMessage('Hata!', 'Hata oluştu lütfen tekrar deneyin.');
        return;
      }
    });
  }
};

// -------------------------- REMOVE ATTACHMENT --------------------------

export const removeAttachment = ({ attachmentId, companyData }) => {

  return (dispatch) => {

    console.log("addAttachment");

    dispatch({ type: ActionTypes.ADDATTACHMENT });

    getToken().then((res) => {
      if(res){
        var token = res['token'];

        let apiUrl = PPConstants.Api.CompanyAttachment + "?id=" + attachmentId;
        console.log(apiUrl);

        token = "Bearer " + token;
        console.log(token);
        fetch(apiUrl, {
          method: 'DELETE',
          headers: {
            "Authorization": token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        },
        ).then(response => {
          console.log(response);
          response.json().then(json => {
            console.log("response json -> " + JSON.stringify(json));
            if(json.status.code == 200 || json.status.code == 201){
              console.log("REMOVEATTACHMENT_SUCCESS");
              let newCompanyData = companyData;
              let companyAttachmentData = companyData.company_attachments;
              let foundIndex = 0;
              companyAttachmentData.map((companyItem, index) => {
                if(companyItem.id == attachmentId){
                  foundIndex = index;
                }
              });
              companyAttachmentData.splice(foundIndex, 1);
              newCompanyData.company_attachments = companyAttachmentData;
              dispatch({
                type: ActionTypes.ADDATTACHMENT_SUCCESS
              });
              dispatch({
                type: ActionTypes.GET_USERCOMPANY_SUCCESS,
                payload: null
              });
              dispatch({
                type: ActionTypes.GET_USERCOMPANY_SUCCESS,
                payload: newCompanyData
              });
              Actions.pop();
              return;
            } else {
              console.log("REMOVEATTACHMENT_ERROR 1");
              dispatch({ type: ActionTypes.ADDATTACHMENT_ERROR });
              ShowAlertMessage('Hata!', 'Hata oluştu lütfen tekrar deneyin.');
              return;
            }
          }).catch((error) => {
            console.log("REMOVEATTACHMENT_ERROR 2");
            dispatch({ type: ActionTypes.ADDATTACHMENT_ERROR });
            ShowAlertMessage('Hata!', 'Hata oluştu lütfen tekrar deneyin.');
            return;
          });
        });
      } else {
        console.log("REMOVEATTACHMENT_ERROR 3");
        dispatch({ type: ActionTypes.ADDATTACHMENT_ERROR });
        ShowAlertMessage('Hata!', 'Hata oluştu lütfen tekrar deneyin.');
        return;
      }
    });
  }
};

// -------------------------- SAVE PROFILE --------------------------

export const saveProfile = ({ profileData }) => {
  return (dispatch) => {
    console.log("saveProfile");

    dispatch({ type: ActionTypes.SAVEPROFILE });

    getToken().then((res) => {
      if(res){
        var token = res['token'];
        token = "Bearer " + token;

        let apiUrl = PPConstants.Api.SaveCompanyInfo;
        console.log(apiUrl);

        fetch(apiUrl, {
          method: 'POST',
          body: JSON.stringify({
            company_name: profileData.company_name,
            phone: profileData.phone,
            phone_extension: "90",
            address: profileData.address,
            about_us: profileData.about,
            city: profileData.cityId,
            district: profileData.districtId,
            tax_number: profileData.tax,
            sector: profileData.sector,
            since: profileData.since,
            employee: profileData.employee,
            role: profileData.from_man ? "ROLE_MANUFACTURER" : null
          }),
          headers: {
            "Authorization": token,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        },
        ).then(response => {
          console.log(response);
          response.json().then(json => {
            console.log("response json -> " + JSON.stringify(json));
            if(json.status.code == 200 || json.status.code == 201){
              console.log("SAVEPROFILE_SUCCESS");
              dispatch({
                type: ActionTypes.SAVEPROFILE_SUCCESS
              });
              dispatch(getCompanyInfo({ token }));
              if(profileData.from_man){
                let userData = profileData.userData;
                userData.is_manufacturer = true;
                dispatch({
                  type: ActionTypes.GET_USERINFO_SUCCESS,
                  payload: userData
                });
                Actions.pop();
                Actions.manRegister({ step: 2 });
              } else {
                Actions.pop();
              }
              return;
            } else {
              console.log("SAVEPROFILE_ERROR 1");
              dispatch({ type: ActionTypes.SAVEPROFILE_ERROR });
              ShowAlertMessage('Hata!', 'Hata oluştu lütfen tekrar deneyin.');
              return;
            }
          }).catch((error) => {
            console.log("SAVEPROFILE_ERROR 2");
            dispatch({ type: ActionTypes.SAVEPROFILE_ERROR });
            ShowAlertMessage('Hata!', 'Hata oluştu lütfen tekrar deneyin.');
            return;
          });
        });
      } else {
        console.log("SAVEPROFILE_ERROR 3");
        dispatch({ type: ActionTypes.SAVEPROFILE_ERROR });
        ShowAlertMessage('Hata!', 'Hata oluştu lütfen tekrar deneyin.');
        return;
      }
    });
  }
};