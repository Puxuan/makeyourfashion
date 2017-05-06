import { keyBy, flatten, mapValues } from 'lodash';
import { combineReducers } from 'redux';
import { ADD_DESIGNS_BY_TAG, FINISH_FETCH_DESIGNS } from '../../action';

function byIds(state = {}, action) {
  switch (action.type) {
    case FINISH_FETCH_DESIGNS:
      return {
        ...state,
        ...keyBy(flatten(action.payload.map(({ designs }) => designs)), 'id'),
      };
    case ADD_DESIGNS_BY_TAG:
      return {
        ...state,
        ...keyBy(action.payload.designs, 'id'),
      };
    default:
      return state;
  }
}

function byTags(state = {}, action) {
  switch (action.type) {
    case ADD_DESIGNS_BY_TAG:
      return {
        ...state,
        [action.payload.tag]: action.payload.designs.map(tag => tag.id),
      };
    case FINISH_FETCH_DESIGNS: {
      return mapValues(keyBy(action.payload, 'id'), tag => tag.designs.map(design => design.id));
    }

    default:
      return state;
  }
}

function byPopularity(state = [], action) {
  switch (action.type) {
    case FINISH_FETCH_DESIGNS:
      return flatten(action.payload.map(({ designs }) => designs.map(design => design.id)));
    default:
      return state;
  }
}

export default combineReducers({ byIds, byTags, byPopularity });
