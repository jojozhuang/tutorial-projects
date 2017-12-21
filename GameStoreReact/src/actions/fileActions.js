import * as types from './actionTypes';
import fileApi from '../api/FileApi';

export function uploadFileSuccess(file) {
  return {type: types.UPLOAD_FILE_SUCCESS, file};
}

export function uploadTestSuccess(restest) {
  return {type: types.UPLOAD_TEST_SUCCESS, restest};
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

export function getTest() {
  return function(dispatch) {
    return fileApi.getTest().then(response => {
      dispatch(uploadTestSuccess(response));
    }).catch(error => {
      throw(error);
    });
  };
}