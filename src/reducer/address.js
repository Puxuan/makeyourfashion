import { ADD_ADDRESS } from '../action';

function address(state = {}, action) {
  switch (action.type) {
    case ADD_ADDRESS:
      return action.payload;
    default:
      return state;
  }
}

export default address;
