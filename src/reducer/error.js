import { combineReducers } from 'redux';
import {
  UPDATE_CURRENT_DESIGN,
  UPDATE_ORDER_ERROR,
  UPDATE_CART_ERROR,
} from '../action';
import { validateOrderWhenPresent } from '../validation';

function cart(state = {}, action) {
  switch (action.type) {
    case UPDATE_CART_ERROR:
      return {
        ...state.cart,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
}

function order(state = {}, action) {
  switch (action.type) {
    case UPDATE_CURRENT_DESIGN:
      return validateOrderWhenPresent(action.payload);
    case UPDATE_ORDER_ERROR:
      return action.payload;
    default:
      return state;
  }
}


export default combineReducers({ cart, order });
