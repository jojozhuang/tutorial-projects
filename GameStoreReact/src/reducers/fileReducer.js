import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';

export default function fileReducer(state = initialState.file, action) {
  switch(action.type) {
    case types.UPLOAD_FILE_SUCCESS:
      return action.file
    default: 
      return state;
  }
}
