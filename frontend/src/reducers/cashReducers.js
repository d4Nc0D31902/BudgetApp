import {
  CASH_DETAILS_REQUEST,
  CASH_DETAILS_SUCCESS,
  CASH_DETAILS_FAIL,
  ADMIN_CASH_REQUEST,
  ADMIN_CASH_SUCCESS,
  ADMIN_CASH_FAIL,
  NEW_CASH_REQUEST,
  NEW_CASH_SUCCESS,
  NEW_CASH_RESET,
  NEW_CASH_FAIL,
  DELETE_CASH_REQUEST,
  DELETE_CASH_SUCCESS,
  DELETE_CASH_RESET,
  DELETE_CASH_FAIL,
  UPDATE_CASH_REQUEST,
  UPDATE_CASH_SUCCESS,
  UPDATE_CASH_RESET,
  UPDATE_CASH_FAIL,
  CLEAR_ERRORS,
  TOTAL_CASH_REQUEST,
  TOTAL_CASH_SUCCESS,
  TOTAL_CASH_FAIL,
  ADD_CASH_REQUEST,
  ADD_CASH_SUCCES,
  ADD_CASH_FAIL,
} from "../constants/cashConstants";

export const cashEntriesReducer = (
  state = { loading: false, cashEntries: [], error: null },
  action
) => {
  switch (action.type) {
    case ADMIN_CASH_REQUEST:
      console.log("ADMIN_CASH_REQUEST dispatched");
      return {
        loading: true,
        cashEntries: [],
        error: null,
      };
    case ADMIN_CASH_FAIL:
      console.log("ADMIN_CASH_FAIL dispatched");
      return {
        loading: false,
        error: action.payload,
        cashEntries: [],
      };
    case ADMIN_CASH_SUCCESS:
      console.log(
        "ADMIN_CASH_SUCCESS dispatched with payload:",
        action.payload
      );
      return {
        ...state,
        loading: false,
        cashEntries: action.payload,
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

export const cashEntryDetailsReducer = (state = { cashEntry: {} }, action) => {
  switch (action.type) {
    case CASH_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CASH_DETAILS_SUCCESS:
      return {
        loading: false,
        cashEntry: action.payload,
      };
    case CASH_DETAILS_FAIL:
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

export const newCashEntryReducer = (state = { cashEntry: {} }, action) => {
  switch (action.type) {
    case NEW_CASH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_CASH_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        cashEntry: action.payload.cashEntry,
      };
    case NEW_CASH_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_CASH_RESET:
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

export const cashReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CASH_REQUEST:
    case UPDATE_CASH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CASH_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_CASH_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_CASH_FAIL:
    case UPDATE_CASH_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_CASH_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_CASH_RESET:
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

export const totalCashReducer = (
  state = { loading: false, totalAmount: 0, error: null },
  action
) => {
  switch (action.type) {
    case TOTAL_CASH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TOTAL_CASH_SUCCESS:
      return {
        loading: false,
        totalAmount: action.payload,
        error: null,
      };
    case TOTAL_CASH_FAIL:
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

export const addAmountReducer = (
  state = { loading: false, success: false, error: null },
  action
) => {
  switch (action.type) {
    case ADD_CASH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_CASH_SUCCES:
      return {
        loading: false,
        success: true,
      };
    case ADD_CASH_FAIL:
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
