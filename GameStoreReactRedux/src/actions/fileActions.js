import * as types from './actionTypes';
import fileApi from '../api/FileApi';

export function uploadFileSuccess(response) {
  return {type: types.UPLOAD_FILE_SUCCESS, response};
}

export function uploadFile(file) {
  return function (dispatch) {
    return fileApi.uploadFile(file).then(response => {
      dispatch(uploadFileSuccess(response));
      return response;
    }).catch(error => {
      throw(error);
    });
  };
}