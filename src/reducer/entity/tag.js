import { combineReducers } from 'redux';
import { keyBy } from 'lodash';
import { FINISH_FETCH_DESIGNS } from '../../action';

function byIds(state = {}, action) {
  switch (action.type) {
    case FINISH_FETCH_DESIGNS:
      return keyBy(action.payload.map(({ id, name }) => ({ id, name })), 'id');
    default:
      return state;
  }
}

function allIds(state = [], action) {
  switch (action.type) {
    case FINISH_FETCH_DESIGNS:
      return action.payload.map(tag => tag.id);
    default:
      return state;
  }
}

export default combineReducers({ byIds, allIds });
