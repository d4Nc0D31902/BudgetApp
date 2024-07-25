import {
  BUDGET_DETAILS_REQUEST,
  BUDGET_DETAILS_SUCCESS,
  BUDGET_DETAILS_FAIL,
  ADMIN_BUDGET_REQUEST,
  ADMIN_BUDGET_SUCCESS,
  ADMIN_BUDGET_FAIL,
  NEW_BUDGET_REQUEST,
  NEW_BUDGET_SUCCESS,
  NEW_BUDGET_RESET,
  NEW_BUDGET_FAIL,
  DELETE_BUDGET_REQUEST,
  DELETE_BUDGET_SUCCESS,
  DELETE_BUDGET_RESET,
  DELETE_BUDGET_FAIL,
  UPDATE_BUDGET_REQUEST,
  UPDATE_BUDGET_SUCCESS,
  UPDATE_BUDGET_RESET,
  UPDATE_BUDGET_FAIL,
  CLEAR_ERRORS,
} from "../constants/budgetConstants";

export const budgetsReducer = (
  state = { loading: false, budgets: [], error: null },
  action
) => {
  switch (action.type) {
    case ADMIN_BUDGET_REQUEST:
      console.log("ADMIN_BUDGET_REQUEST dispatched");
      return {
        loading: true,
        budgets: [],
        error: null,
      };
    case ADMIN_BUDGET_FAIL:
      console.log("ADMIN_BUDGET_FAIL dispatched");
      return {
        loading: false,
        error: action.payload,
        budgets: [],
      };
    case ADMIN_BUDGET_SUCCESS:
      console.log(
        "ADMIN_BUDGET_SUCCESS dispatched with payload:",
        action.payload
      );
      return {
        ...state,
        loading: false,
        budgets: action.payload,
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

export const budgetDetailsReducer = (state = { budget: {} }, action) => {
  switch (action.type) {
    case BUDGET_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case BUDGET_DETAILS_SUCCESS:
      return {
        loading: false,
        budget: action.payload,
      };
    case BUDGET_DETAILS_FAIL:
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

export const newBudgetReducer = (state = { budget: {} }, action) => {
  switch (action.type) {
    case NEW_BUDGET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_BUDGET_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        budget: action.payload.budget,
      };
    case NEW_BUDGET_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_BUDGET_RESET:
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

export const budgetReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BUDGET_REQUEST:
    case UPDATE_BUDGET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_BUDGET_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_BUDGET_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_BUDGET_FAIL:
    case UPDATE_BUDGET_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_BUDGET_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_BUDGET_RESET:
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
