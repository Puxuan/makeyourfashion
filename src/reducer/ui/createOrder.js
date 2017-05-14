import {
  TOGGLE_PRODUCT_MODEL,
  TOGGLE_DESIGN_MODEL,
  TOGGLE_ADD_TEXT_PANEL,
  UPDATE_ACTIVE_TEXT_ID,
  TOGGLE_EDIT_TEXT_PANEL,
  UPDATE_ACTIVE_IMAGE,
  FINISH_FETCH_SPEC,
  SET_MODE,
  SET_ACTIVE_CATEGORY,
  SET_ACTIVE_SUB_CATEGORY,
  FINISH_FETCH_CATEGORIES,
  RESET_CREATE_ORDER_STATE,
} from '../../action';

const initialState = {
  editable: true,
  isDesignModelOpen: false,
  isProductModelOpen: false,
  showTextEdit: false,
  showTextSettings: false,
};

function createOrder(state = initialState, action) {
  switch (action.type) {
    case RESET_CREATE_ORDER_STATE:
      return initialState;
    case FINISH_FETCH_CATEGORIES:
      return {
        ...state,
        activeCategory: action.payload[0].id,
      };
    case SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload,
        activeSubCategory: null,
      };
    case SET_ACTIVE_SUB_CATEGORY:
      return {
        ...state,
        activeSubCategory: action.payload,
      };
    case FINISH_FETCH_SPEC:
      return {
        ...state,
        activeImageId: action.payload.pics[0].id,
      };
    case TOGGLE_PRODUCT_MODEL:
      if (action.payload !== null && action.payload !== undefined) {
        return {
          ...state,
          isProductModelOpen: action.payload,
        };
      }
      return {
        ...state,
        isProductModelOpen: !state.isProductModelOpen,
      };
    case SET_MODE:
      return {
        ...state,
        editable: action.payload,
      };
    case UPDATE_ACTIVE_IMAGE:
      return {
        ...state,
        activeImageId: action.payload,
      };
    case TOGGLE_DESIGN_MODEL:
      return {
        ...state,
        isDesignModelOpen: !state.isDesignModelOpen,
      };
    case UPDATE_ACTIVE_TEXT_ID:
      return {
        ...state,
        activeTextId: action.payload,
      };
    case TOGGLE_ADD_TEXT_PANEL:
      if (state.showTextEdit === true) {
        return {
          ...state,
          showTextSettings: !state.showTextSettings,
          showTextEdit: false,
        };
      }
      return {
        ...state,
        showTextSettings: !state.showTextSettings,
      };
    case TOGGLE_EDIT_TEXT_PANEL:
      if (state.showTextSettings === true) {
        return {
          ...state,
          showTextEdit: action.payload,
          showTextSettings: false,
        };
      }
      return {
        ...state,
        showTextEdit: action.payload,
      };
    default:
      return state;
  }
}

export default createOrder;
