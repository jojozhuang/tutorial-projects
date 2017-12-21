import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {browserHistory} from 'react-router';

export default function fileReducer(state = initialState.file, action) {
  //console.log('fileReducer');
  //console.log(initialState.file);
  //console.log(action);
  switch(action.type) {
    case types.UPLOAD_FILE_SUCCESS:
      return action.file
    case types.UPLOAD_TEST_SUCCESS:
    console.log(action.restest);
    state.file = Object.assign({}, action.restest);
      return state;
      //return action.file
    default: 
      return state;
  }
}
