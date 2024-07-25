import {
  EXPENSES_DETAILS_REQUEST,
  EXPENSES_DETAILS_SUCCESS,
  EXPENSES_DETAILS_FAIL,
  ADMIN_EXPENSES_REQUEST,
  ADMIN_EXPENSES_SUCCESS,
  ADMIN_EXPENSES_FAIL,
  NEW_EXPENSES_REQUEST,
  NEW_EXPENSES_SUCCESS,
  NEW_EXPENSES_RESET,
  NEW_EXPENSES_FAIL,
  DELETE_EXPENSES_REQUEST,
  DELETE_EXPENSES_SUCCESS,
  DELETE_EXPENSES_RESET,
  DELETE_EXPENSES_FAIL,
  UPDATE_EXPENSES_REQUEST,
  UPDATE_EXPENSES_SUCCESS,
  UPDATE_EXPENSES_RESET,
  UPDATE_EXPENSES_FAIL,
  CLEAR_ERRORS,
  TOTAL_EXPENSES_REQUEST,
  TOTAL_EXPENSES_SUCCESS,
  TOTAL_EXPENSES_FAIL,
} from "../constants/expensesConstants";

export const expensesEntriesReducer = (
  state = { loading: false, expensesEntries: [], error: null },
  action
) => {
  switch (action.type) {
    case ADMIN_EXPENSES_REQUEST:
      console.log("ADMIN_EXPENSES_REQUEST dispatched");
      return {
        loading: true,
        expensesEntries: [],
        error: null,
      };
    case ADMIN_EXPENSES_FAIL:
      console.log("ADMIN_EXPENSES_FAIL dispatched");
      return {
        loading: false,
        error: action.payload,
        expensesEntries: [],
      };
    case ADMIN_EXPENSES_SUCCESS:
      console.log(
        "ADMIN_EXPENSES_SUCCESS dispatched with payload:",
        action.payload
      );
      return {
        ...state,
        loading: false,
        expensesEntries: action.payload,
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

export const expensesEntryDetailsReducer = (
  state = { expensesEntry: {} },
  action
) => {
  switch (action.type) {
    case EXPENSES_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EXPENSES_DETAILS_SUCCESS:
      return {
        loading: false,
        expensesEntry: action.payload,
      };
    case EXPENSES_DETAILS_FAIL:
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

export const newExpensesEntryReducer = (
  state = { expensesEntry: {} },
  action
) => {
  switch (action.type) {
    case NEW_EXPENSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_EXPENSES_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        expensesEntry: action.payload.expensesEntry,
      };
    case NEW_EXPENSES_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_EXPENSES_RESET:
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

export const expensesReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EXPENSES_REQUEST:
    case UPDATE_EXPENSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_EXPENSES_FAIL:
    case UPDATE_EXPENSES_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_EXPENSES_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_EXPENSES_RESET:
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

export const totalExpensesReducer = (
  state = { loading: false, totalExpenses: 0, error: null },
  action
) => {
  switch (action.type) {
    case TOTAL_EXPENSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TOTAL_EXPENSES_SUCCESS:
      return {
        loading: false,
        totalExpenses: action.payload,
        error: null,
      };
    case TOTAL_EXPENSES_FAIL:
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
