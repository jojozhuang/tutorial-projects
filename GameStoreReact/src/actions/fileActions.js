import * as types from './actionTypes';
import fileApi from '../api/FileApi';

export function uploadFileSuccess(file) {
  return {type: types.UPLOAD_FILE_SUCCESS, file};
}

export function uploadFile(file) {
  return function (dispatch) {
    return fileApi.uploadFile(file).then(response => {
      //console.log(response);
      dispatch(uploadFileSuccess(response));
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}