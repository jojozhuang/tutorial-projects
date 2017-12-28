import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function errorReducer(state = initialState.error, action) {
  switch(action.type) {
    case types.FETCH_RESOURCES_FAIL: {
      console.log('types.FETCH_RESOURCES_FAIL');
      console.log(state);
      console.log(action);
      //state = initialState;
      //state.error = action.error;
      //initialState.error = action.error;
      /*return Object.assign({}, state, {
        error: action.error
      })*/
      if (action.wrapperRes) {
        return action.wrapperRes;
      } else {
        return action.error;
      }
    }
    default: 
      return state;
  }
}
