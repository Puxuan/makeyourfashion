import { combineReducers } from 'redux';
import { keyBy } from 'lodash';
import { FINISH_FETCH_CATEGORY } from '../../action';

function byIds(state = {}, action) {
  switch (action.type) {
    case FINISH_FETCH_CATEGORY: {
      const subCategories = action.payload.category.map(({ id, name }) => ({
        id, name,
      }));
      return {
        ...state,
        ...keyBy(subCategories, 'id'),
      };
    }
    default:
      return state;
  }
}

function byCategories(state = {}, action) {
  switch (action.type) {
    case FINISH_FETCH_CATEGORY: {
      const subCategories = action.payload.category.map(sub => sub.id);
      return {
        ...state,
        [action.payload.parent]: subCategories,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({ byIds, byCategories });
