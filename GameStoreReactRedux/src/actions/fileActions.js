import * as types from './actionTypes';
import fileApi from '../api/FileApi';

export function uploadFileSuccess(response, product) {
  let wrapperRes =  Object.assign({}, response, {
    product: product
  });
  return {type: types.UPLOAD_FILE_SUCCESS, wrapperRes};
}

export function fetchResoucesFail(error, product) {
  let wrapperRes =  Object.assign({}, {
    error: error
  });
   wrapperRes =  Object.assign({}, wrapperRes, {
    product: product
  });
  return {type: types.FETCH_RESOURCES_FAIL, wrapperRes}
}

export function uploadFile(file, product) {
  return function (dispatch) {
    return fileApi.uploadFile(file).then(response => {
      dispatch(uploadFileSuccess(response, product));
      return response;
    }).catch(error => {
      dispatch(fetchResoucesFail(error, product));
      return error;
    });
  };
}