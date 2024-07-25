import {
  INCOME_DETAILS_REQUEST,
  INCOME_DETAILS_SUCCESS,
  INCOME_DETAILS_FAIL,
  ADMIN_INCOME_REQUEST,
  ADMIN_INCOME_SUCCESS,
  ADMIN_INCOME_FAIL,
  NEW_INCOME_REQUEST,
  NEW_INCOME_SUCCESS,
  NEW_INCOME_RESET,
  NEW_INCOME_FAIL,
  DELETE_INCOME_REQUEST,
  DELETE_INCOME_SUCCESS,
  DELETE_INCOME_RESET,
  DELETE_INCOME_FAIL,
  UPDATE_INCOME_REQUEST,
  UPDATE_INCOME_SUCCESS,
  UPDATE_INCOME_RESET,
  UPDATE_INCOME_FAIL,
  TOTAL_INCOME_FAIL,
  TOTAL_INCOME_REQUEST,
  TOTAL_INCOME_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/incomeConstants";

export const incomeEntriesReducer = (
  state = { loading: false, incomeEntries: [], error: null },
  action
) => {
  switch (action.type) {
    case ADMIN_INCOME_REQUEST:
      console.log("ADMIN_INCOME_REQUEST dispatched");
      return {
        loading: true,
        incomeEntries: [],
        error: null,
      };
    case ADMIN_INCOME_FAIL:
      console.log("ADMIN_INCOME_FAIL dispatched");
      return {
        loading: false,
        error: action.payload,
        incomeEntries: [],
      };
    case ADMIN_INCOME_SUCCESS:
      console.log(
        "ADMIN_INCOME_SUCCESS dispatched with payload:",
        action.payload
      );
      return {
        ...state,
        loading: false,
        incomeEntries: action.payload,
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

export const incomeEntryDetailsReducer = (
  state = { incomeEntry: {} },
  action
) => {
  switch (action.type) {
    case INCOME_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INCOME_DETAILS_SUCCESS:
      return {
        loading: false,
        incomeEntry: action.payload,
      };
    case INCOME_DETAILS_FAIL:
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

export const newIncomeEntryReducer = (state = { incomeEntry: {} }, action) => {
  switch (action.type) {
    case NEW_INCOME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_INCOME_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        incomeEntry: action.payload.incomeEntry,
      };
    case NEW_INCOME_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_INCOME_RESET:
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

export const incomeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_INCOME_REQUEST:
    case UPDATE_INCOME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_INCOME_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_INCOME_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_INCOME_FAIL:
    case UPDATE_INCOME_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_INCOME_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_INCOME_RESET:
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

export const totalIncomeReducer = (
  state = { loading: false, totalIncome: 0, error: null },
  action
) => {
  switch (action.type) {
    case TOTAL_INCOME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TOTAL_INCOME_SUCCESS:
      return {
        loading: false,
        totalIncome: action.payload,
        error: null,
      };
    case TOTAL_INCOME_FAIL:
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
