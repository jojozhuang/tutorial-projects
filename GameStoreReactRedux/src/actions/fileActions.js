import * as types from './actionTypes';
import fileApi from '../api/FileApi';

export function uploadFileSuccess(response) {
  return {type: types.UPLOAD_FILE_SUCCESS, response};
}

export function fetchResoucesFail(error) {
  return {type: types.FETCH_RESOURCES_FAIL, error};
}

export function uploadFile(file, product) {
  return function (dispatch) {
    return fileApi.uploadFile(file).then(response => {
      dispatch(fetchResoucesFail(null)); // clear error
      dispatch(uploadFileSuccess(Object.assign(response, {product: product})));
    }).catch(error => {
      dispatch(fetchResoucesFail(Object.assign(error, {product: product})));
    });
  };
}