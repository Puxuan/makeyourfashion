import { combineReducers } from 'redux';
import { keyBy } from 'lodash';
import { FINISH_FETCH_CATEGORIES } from '../../action';

function byIds(state = {}, action) {
  switch (action.type) {
    case FINISH_FETCH_CATEGORIES:
      return keyBy(action.payload, 'id');
    default:
      return state;
  }
}

export default combineReducers({ byIds });
