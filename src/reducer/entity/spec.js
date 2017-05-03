import { combineReducers } from 'redux';
import { FINISH_FETCH_SPEC } from '../../action';

function byIds(state = {}, action) {
  switch (action.type) {
    case FINISH_FETCH_SPEC:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
}

export default combineReducers({ byIds });
