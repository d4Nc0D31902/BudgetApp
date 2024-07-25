import {
  SAVINGS_DETAILS_REQUEST,
  SAVINGS_DETAILS_SUCCESS,
  SAVINGS_DETAILS_FAIL,
  ADMIN_SAVINGS_REQUEST,
  ADMIN_SAVINGS_SUCCESS,
  ADMIN_SAVINGS_FAIL,
  NEW_SAVINGS_REQUEST,
  NEW_SAVINGS_SUCCESS,
  NEW_SAVINGS_RESET,
  NEW_SAVINGS_FAIL,
  DELETE_SAVINGS_REQUEST,
  DELETE_SAVINGS_SUCCESS,
  DELETE_SAVINGS_RESET,
  DELETE_SAVINGS_FAIL,
  UPDATE_SAVINGS_REQUEST,
  UPDATE_SAVINGS_SUCCESS,
  UPDATE_SAVINGS_RESET,
  UPDATE_SAVINGS_FAIL,
  TOTAL_SAVINGS_FAIL,
  TOTAL_SAVINGS_REQUEST,
  TOTAL_SAVINGS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/savingsConstants";

export const savingsEntriesReducer = (
  state = { loading: false, savingsEntries: [], error: null },
  action
) => {
  switch (action.type) {
    case ADMIN_SAVINGS_REQUEST:
      console.log("ADMIN_SAVINGS_REQUEST dispatched");
      return {
        loading: true,
        savingsEntries: [],
        error: null,
      };
    case ADMIN_SAVINGS_FAIL:
      console.log("ADMIN_SAVINGS_FAIL dispatched");
      return {
        loading: false,
        error: action.payload,
        savingsEntries: [],
      };
    case ADMIN_SAVINGS_SUCCESS:
      console.log(
        "ADMIN_SAVINGS_SUCCESS dispatched with payload:",
        action.payload
      );
      return {
        ...state,
        loading: false,
        savingsEntries: action.payload,
        error: null,
      };
    case CLEAR_ERRORS:
      console.log("CLEAR_ERRORS dispatched");
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const savingsEntryDetailsReducer = (
  state = { savingsEntry: {} },
  action
) => {
  switch (action.type) {
    case SAVINGS_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SAVINGS_DETAILS_SUCCESS:
      return {
        loading: false,
        savingsEntry: action.payload,
      };
    case SAVINGS_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newSavingsEntryReducer = (
  state = { savingsEntry: {} },
  action
) => {
  switch (action.type) {
    case NEW_SAVINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_SAVINGS_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        savingsEntry: action.payload.savingsEntry,
      };
    case NEW_SAVINGS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_SAVINGS_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const savingsReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SAVINGS_REQUEST:
    case UPDATE_SAVINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SAVINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_SAVINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_SAVINGS_FAIL:
    case UPDATE_SAVINGS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_SAVINGS_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_SAVINGS_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const totalSavingsReducer = (
  state = { loading: false, totalSavings: 0, error: null },
  action
) => {
  switch (action.type) {
    case TOTAL_SAVINGS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TOTAL_SAVINGS_SUCCESS:
      return {
        loading: false,
        totalSavings: action.payload,
        error: null,
      };
    case TOTAL_SAVINGS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
