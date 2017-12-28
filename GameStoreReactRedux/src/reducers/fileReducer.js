import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function fileReducer(state = initialState.response, action) {
  switch(action.type) {
    case types.UPLOAD_FILE_SUCCESS:
      //console.log('fileReducer');
      //console.log(initialState);
      //console.log(action);
      //let response = action.response
      
      console.log(state);
      
      let res = Object.assign({}, state, {
        response: action.response
      });
      console.log(res);
      return res;
    default: 
      return state;
  }
}
