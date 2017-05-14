import { isEmpty, omitBy } from 'lodash';
import uuid from 'uuid/v4';
import { host } from './config';

const RESET_CREATE_ORDER_STATE = 'RESET_CREATE_ORDER_STATE';
const TOGGLE_PRODUCT_MODEL = 'TOGGLE_PRODUCT_MODEL';
const TOGGLE_DESIGN_MODEL = 'TOGGLE_DESIGN_MODEL';
const UPDATE_ORDER = 'UPDATE_ORDER';
const START_FETCH_PRODUCT = 'START_FETCH_PRODUCT';
const FINISH_FETCH_PRODUCT = 'FINISH_FETCH_PRODUCT';
const START_FETCH_DESIGNS = 'START_FETCH_DESIGNS';
const FINISH_FETCH_DESIGNS = 'FINISH_FETCH_DESIGNS';
const START_FETCH_CATEGORY = 'START_FETCH_CATEGORY';
const FINISH_FETCH_CATEGORY = 'FINISH_FETCH_CATEGORY';
const START_FETCH_CATEGORIES = 'START_FETCH_CATEGORIES';
const FINISH_FETCH_CATEGORIES = 'FINISH_FETCH_CATEGORIES';
const START_FETCH_TAG = 'START_FETCH_TAG';
const FINISH_FETCH_TAG = 'FINISH_FETCH_TAG';
const ADD_TO_CART = 'ADD_TO_CART';
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
const ADD_DESIGNS_BY_TAG = 'ADD_DESIGNS_BY_TAG';
const ENTER_PREVIEW_MODE = 'ENTER_PREVIEW_MODE';
const ADD_SORTED_DESIGNS = 'ADD_SORTED_DESIGNS';
const REPLACE_TAGS = 'REPLACE_TAGS';
const REMOVE_DESIGN = 'REMOVE_DESIGN';
const TOGGLE_ADD_TEXT_PANEL = 'TOGGLE_ADD_TEXT_PANEL';
const UPDATE_ACTIVE_TEXT_ID = 'UPDATE_ACTIVE_TEXT_ID';
const TOGGLE_EDIT_TEXT_PANEL = 'TOGGLE_EDIT_TEXT_PANEL';
const ADD_SPEC = 'ADD_SPEC';
const UPDATE_TEXT = 'UPDATE_TEXT';
const UPDATE_DESIGN = 'UPDATE_DESIGN';
const ADD_TEXT_TO_PIC = 'ADD_TEXT_TO_PIC';
const ADD_DESIGN_TO_PIC = 'ADD_DESIGN_TO_PIC';
const REMOVE_TEXT = 'REMOVE_TEXT';
const UPDATE_CURRENT_DESIGN = 'UPDATE_CURRENT_DESIGN';
const UPDATE_ACTIVE_IMAGE = 'UPDATE_ACTIVE_IMAGE';
const START_FETCH_SPEC = 'START_FETCH_SPEC';
const FINISH_FETCH_SPEC = 'FINISH_FETCH_SPEC';
const SELECT_PRODUCT = 'SELECT_PRODUCT';
const SET_MODE = 'SET_MODE';
const SET_ACTIVE_CATEGORY = 'SET_ACTIVE_CATEGORY';
const SET_ACTIVE_SUB_CATEGORY = 'SET_ACTIVE_SUB_CATEGORY';
const ADD_ADDRESS = 'ADD_ADDRESS';
const REPLACE_CURRENT_DESIGN = 'REPLACE_CURRENT_DESIGN';
const CLEAR_CART = 'CLEAR_CART';

const resetCreateOrderState = {
  type: RESET_CREATE_ORDER_STATE,
};

const toggleDesignModel = {
  type: TOGGLE_DESIGN_MODEL,
};

const toggleAddTextPanel = {
  type: TOGGLE_ADD_TEXT_PANEL,
};

const clearCart = {
  type: CLEAR_CART,
};

function toggleProductModel(payload) {
  return {
    type: TOGGLE_PRODUCT_MODEL,
    payload,
  };
}

function setActiveCategory(category) {
  return {
    type: SET_ACTIVE_CATEGORY,
    payload: category,
  };
}

function addAddress(address) {
  return {
    type: ADD_ADDRESS,
    payload: address,
  };
}

function editCartItem(id) {
  return (dispatch, getState) => {
    const cartItem = getState().cart[id];
    dispatch({
      type: REPLACE_CURRENT_DESIGN,
      payload: {
        ...cartItem,
        detail: {
          ...cartItem.detail,
          cartId: id,
        },
      },
    });
  };
}

function setActiveSubCategory(subCategory) {
  return {
    type: SET_ACTIVE_SUB_CATEGORY,
    payload: subCategory,
  };
}

function setMode(mode) {
  return {
    type: SET_MODE,
    payload: mode,
  };
}

function toggleEditTextPanel(payload) {
  return {
    type: TOGGLE_EDIT_TEXT_PANEL,
    payload,
  };
}

function updateActiveTextId(id) {
  return {
    type: UPDATE_ACTIVE_TEXT_ID,
    payload: id,
  };
}

function updateActiveImage(id) {
  return {
    type: UPDATE_ACTIVE_IMAGE,
    payload: +id,
  };
}

function updateCurrentDesign(payload) {
  return {
    type: UPDATE_CURRENT_DESIGN,
    payload,
  };
}

function selectProduct(productId) {
  return {
    type: SELECT_PRODUCT,
    payload: {
      productId,
    },
  };
}

function updateText(text) {
  return {
    type: UPDATE_TEXT,
    payload: text,
  };
}

function updateDesign(design) {
  return {
    type: UPDATE_DESIGN,
    payload: design,
  };
}

function addTextToPic(text) {
  return {
    type: ADD_TEXT_TO_PIC,
    payload: {
      ...text,
      id: uuid(),
    },
  };
}

function removeDesign(id) {
  return {
    type: REMOVE_DESIGN,
    payload: id,
  };
}

function removeText(id) {
  return {
    type: REMOVE_TEXT,
    payload: id,
  };
}

function addDesignToPic(design) {
  return {
    type: ADD_DESIGN_TO_PIC,
    payload: {
      ...design,
      id: uuid(),
    },
  };
}

function updateCartItem(payload) {
  return {
    type: UPDATE_CART_ITEM,
    payload,
  };
}

function removeItemFromCart(payload) {
  return (dispatch, getState) => {
    const id = payload;
    const newCart = omitBy(getState().entities.cart, order => order.id === id);
    localStorage.setItem('myf_cart', JSON.stringify(newCart));
    dispatch({
      type: REMOVE_ITEM_FROM_CART,
      payload,
    });
  };
}

function addToCart(payload) {
  return {
    type: ADD_TO_CART,
    payload: {
      ...payload,
      id: uuid(),
    },
  };
}

function fetchCategory(id) {
  return (dispatch, getState) => {
    const fetchStatus = getState().fetchStatus;
    if (!fetchStatus.isFetchingCategory
      && isEmpty(getState().entities.subCategories.byCategories[id])) {
      dispatch({
        type: START_FETCH_CATEGORY,
      });
      fetch(`/api/category/${id}`).then(res => res.json()).then((category) => {
        dispatch({
          type: FINISH_FETCH_CATEGORY,
          payload: {
            category,
            parent: id,
          },
        });
      });
    }
  };
}

function fetchTags() {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.fetchStatus.isFetchingTag && isEmpty(state.entities.tags.byIds)) {
      dispatch({
        type: START_FETCH_TAG,
      });
      fetch(`${host}tag.json`)
        .then(res => res.json())
        .then((tags) => {
          dispatch({
            type: REPLACE_TAGS,
            payload: tags,
          });
          dispatch({
            type: FINISH_FETCH_TAG,
          });
        });
    }
  };
}

function fetchDesigns() {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.fetchStatus.isFetchingDesign && isEmpty(state.entities.designs.byIds)) {
      dispatch({
        type: START_FETCH_DESIGNS,
      });
      fetch('/api/designs')
        .then(res => res.json())
        .then((designs) => {
          dispatch({
            type: FINISH_FETCH_DESIGNS,
            payload: designs,
          });
        });
    }
  };
}

function fetchSpec(id) {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.isFetchingSpec && !state.entities.specs.byIds[id]) {
      dispatch({
        type: START_FETCH_SPEC,
      });
      fetch(`/api/spec/${id}`).then(res => res.json())
        .then((spec) => {
          dispatch({
            type: FINISH_FETCH_SPEC,
            payload: spec,
          });
        });
    }
  };
}

function fetchCategories() {
  return (dispatch, getState) => {
    const state = getState();
    if (!state.isFetchingCategories && isEmpty(state.entities.categories.byIds)) {
      dispatch({
        type: START_FETCH_CATEGORIES,
      });
      fetch('/api/category').then(res => res.json())
        .then((categories) => {
          dispatch({
            type: FINISH_FETCH_CATEGORIES,
            payload: categories,
          });
          dispatch(fetchCategory(categories[0].id));
        });
    }
  };
}

function fetchDesignsByTag(tag) {
  return (dispatch, getState) => {
    const state = getState();
    if (isEmpty(state.entities.designs.byTags[tag])) {
      fetch(`${host}design${tag}.json`)
        .then(res => res.json())
        .then((designs) => {
          dispatch({
            type: ADD_DESIGNS_BY_TAG,
            payload: {
              designs,
              tag,
            },
          });
        });
    }
  };
}

export {
  TOGGLE_PRODUCT_MODEL,
  TOGGLE_DESIGN_MODEL,
  UPDATE_ORDER,
  START_FETCH_PRODUCT,
  FINISH_FETCH_PRODUCT,
  START_FETCH_DESIGNS,
  FINISH_FETCH_DESIGNS,
  START_FETCH_TAG,
  FINISH_FETCH_TAG,
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_ITEM_FROM_CART,
  ADD_DESIGNS_BY_TAG,
  ADD_SORTED_DESIGNS,
  ENTER_PREVIEW_MODE,
  TOGGLE_ADD_TEXT_PANEL,
  REPLACE_TAGS,
  UPDATE_ACTIVE_TEXT_ID,
  TOGGLE_EDIT_TEXT_PANEL,
  START_FETCH_CATEGORY,
  FINISH_FETCH_CATEGORY,
  UPDATE_ACTIVE_IMAGE,
  REMOVE_DESIGN,
  ADD_SPEC,
  UPDATE_TEXT,
  UPDATE_DESIGN,
  ADD_TEXT_TO_PIC,
  ADD_DESIGN_TO_PIC,
  UPDATE_CURRENT_DESIGN,
  REMOVE_TEXT,
  SET_MODE,
  SELECT_PRODUCT,
  START_FETCH_SPEC,
  FINISH_FETCH_SPEC,
  SET_ACTIVE_CATEGORY,
  SET_ACTIVE_SUB_CATEGORY,
  START_FETCH_CATEGORIES,
  FINISH_FETCH_CATEGORIES,
  ADD_ADDRESS,
  CLEAR_CART,
  REPLACE_CURRENT_DESIGN,
  RESET_CREATE_ORDER_STATE,
  resetCreateOrderState,
  updateActiveImage,
  toggleProductModel,
  toggleDesignModel,
  updateCurrentDesign,
  fetchDesigns,
  fetchTags,
  setMode,
  addToCart,
  updateCartItem,
  removeItemFromCart,
  fetchDesignsByTag,
  removeDesign,
  addTextToPic,
  addDesignToPic,
  updateText,
  updateDesign,
  toggleAddTextPanel,
  toggleEditTextPanel,
  updateActiveTextId,
  removeText,
  fetchCategory,
  selectProduct,
  fetchSpec,
  setActiveCategory,
  setActiveSubCategory,
  fetchCategories,
  addAddress,
  editCartItem,
  clearCart,
};
