import { keyBy, flatten, mapValues } from 'lodash';
import { combineReducers } from 'redux';
import { FINISH_FETCH_CATEGORY } from '../../action';

function byIds(state = {}, action) {
  switch (action.type) {
    case FINISH_FETCH_CATEGORY: {
      const products = flatten(action.payload.category.map(sub => sub.products));
      return {
        ...state,
        ...keyBy(products, 'id'),
      };
    }
    default:
      return state;
  }
}

function byCategories(state = {}, action) {
  switch (action.type) {
    case FINISH_FETCH_CATEGORY: {
      const allProducts = flatten(action.payload.category.map(v => v.products.map(p => p.id)));
      const subCatMap = mapValues(keyBy(action.payload.category, 'id'), v => v.products.map(p => p.id));
      return {
        ...state,
        [action.payload.parent]: allProducts,
        ...subCatMap,
      };
    }
    default:
      return state;
  }
}

export default combineReducers({ byIds, byCategories });
