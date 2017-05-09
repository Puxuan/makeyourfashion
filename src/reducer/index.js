import { combineReducers } from 'redux';

import fetchStatus from './fetchStatus';
import entities from './entity';
import error from './error';
import cart from './cart';
import ui from './ui';
import currentDesign from './currentDesign';
import address from './address';

export default combineReducers({
  entities,
  ui,
  fetchStatus,
  cart,
  currentDesign,
  error,
  address,
});
