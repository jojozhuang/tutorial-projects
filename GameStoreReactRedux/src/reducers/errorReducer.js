import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function errorReducer(state = initialState.error, action) {
  switch(action.type) {
    case types.FETCH_RESOURCES_FAIL: {
      return action.error;
    }
    default: 
      return state;
  }
}
