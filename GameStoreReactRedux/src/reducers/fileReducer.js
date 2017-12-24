import * as types from '../actions/actionTypes';
import initialStatus from './initialStatus';

export default function fileReducer(state = initialStatus.response, action) {
  switch(action.type) {
    case types.UPLOAD_FILE_SUCCESS:
      //console.log('fileReducer');
      //console.log(initialStatus);
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
