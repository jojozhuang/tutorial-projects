import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fileReducer(state = initialState.response, action) {
  switch(action.type) {
    case types.UPLOAD_FILE_SUCCESS:
      return action.response;
    default: 
      return state;
  }
}
