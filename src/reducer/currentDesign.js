import { combineReducers } from 'redux';
import { omitBy, mapValues } from 'lodash';
import {
  UPDATE_CURRENT_DESIGN,
  UPDATE_TEXT,
  UPDATE_DESIGN,
  ADD_TEXT_TO_PIC,
  ADD_DESIGN_TO_PIC,
  REMOVE_TEXT,
  REMOVE_DESIGN,
  SELECT_PRODUCT,
  REPLACE_CURRENT_DESIGN,
} from '../action';

function textByIds(state = {}, action) {
  switch (action.type) {
    case ADD_TEXT_TO_PIC:
    case UPDATE_TEXT:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    case REMOVE_TEXT:
      return omitBy(state, (v, k) => k === action.payload);
    case REPLACE_CURRENT_DESIGN:
      return action.payload.texts.byIds;
    default:
      return state;
  }
}

function textByPics(state = {}, action) {
  switch (action.type) {
    case ADD_TEXT_TO_PIC:
      return {
        ...state,
        [action.payload.picId]: [
          ...(state[action.payload.picId] || []),
          action.payload.id,
        ],
      };
    case REMOVE_TEXT:
      return mapValues(state, v => v.filter(id => id !== action.payload));
    case REPLACE_CURRENT_DESIGN:
      return action.payload.texts.byPics;
    default:
      return state;
  }
}

const texts = combineReducers({ byIds: textByIds, byPics: textByPics });

function designByIds(state = {}, action) {
  switch (action.type) {
    case ADD_DESIGN_TO_PIC:
    case UPDATE_DESIGN:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          ...action.payload,
        },
      };
    case REMOVE_DESIGN:
      return omitBy(state, (v, k) => k === action.payload);
    case REPLACE_CURRENT_DESIGN:
      return action.payload.designs.byIds;
    default:
      return state;
  }
}

function designByPics(state = {}, action) {
  switch (action.type) {
    case ADD_DESIGN_TO_PIC:
      return {
        ...state,
        [action.payload.picId]: [
          ...(state[action.payload.picId] || []),
          action.payload.id,
        ],
      };
    case REMOVE_DESIGN:
      return mapValues(state, v => v.filter(id => id !== action.payload));
    case REPLACE_CURRENT_DESIGN:
      return action.payload.designs.byPics;
    default:
      return state;
  }
}

const designs = combineReducers({ byIds: designByIds, byPics: designByPics });

function detail(state = {}, action) {
  switch (action.type) {
    case SELECT_PRODUCT:
    case UPDATE_CURRENT_DESIGN:
      return {
        ...state,
        ...action.payload,
      };
    case REPLACE_CURRENT_DESIGN:
      return action.payload.detail;
    default:
      return state;
  }
}

export default combineReducers({ texts, designs, detail });
