import {
  START_FETCH_PRODUCT,
  FINISH_FETCH_PRODUCT,
  START_FETCH_DESIGNS,
  FINISH_FETCH_DESIGNS,
  START_FETCH_TAG,
  FINISH_FETCH_TAG,
  START_FETCH_CATEGORY,
  FINISH_FETCH_CATEGORY,
  START_FETCH_SPEC,
  FINISH_FETCH_SPEC,
  START_FETCH_CATEGORIES,
  FINISH_FETCH_CATEGORIES,
} from '../action';

export default function fetchStatus(state = {}, action) {
  switch (action.type) {
    case START_FETCH_PRODUCT:
      return {
        ...state,
        isFetchingProduct: true,
      };
    case FINISH_FETCH_PRODUCT:
      return {
        ...state,
        isFetchingProduct: false,
      };
    case START_FETCH_DESIGNS:
      return {
        ...state,
        isFetchingDesigns: true,
      };
    case FINISH_FETCH_DESIGNS:
      return {
        ...state,
        isFetchingDesigns: false,
      };
    case START_FETCH_TAG:
      return {
        ...state,
        isFetchingTag: true,
      };
    case FINISH_FETCH_TAG:
      return {
        ...state,
        isFetchingTag: false,
      };
    case START_FETCH_SPEC:
      return {
        ...state,
        isFetchingSpec: true,
      };
    case FINISH_FETCH_SPEC:
      return {
        ...state,
        isFetchingSpec: false,
      };
    case START_FETCH_CATEGORY:
      return {
        ...state,
        isFetchingCategory: true,
      };
    case FINISH_FETCH_CATEGORY:
      return {
        ...state,
        isFetchingCategory: false,
      };
    case START_FETCH_CATEGORIES:
      return {
        ...state,
        isFetchingCategories: true,
      };
    case FINISH_FETCH_CATEGORIES:
      return {
        ...state,
        isFetchingCategories: false,
      };
    default:
      return state;
  }
}
