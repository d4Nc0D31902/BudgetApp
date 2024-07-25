import {
  MONTHLY_SALES_REQUEST,
  MONTHLY_SALES_SUCCESS,
  MONTHLY_SALES_FAIL,
  PRODUCT_SALES_REQUEST,
  PRODUCT_SALES_SUCCESS,
  PRODUCT_SALES_FAIL,
  MONTHLY_INCOME_FAIL,
  MONTHLY_INCOME_REQUEST,
  MONTHLY_INCOME_SUCCESS,
  MONTHLY_EXPENSES_FAIL,
  MONTHLY_EXPENSES_REQUEST,
  MONTHLY_EXPENSES_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/chartConstants";

export const salesPerMonthReducer = (state = { salesPerMonth: [] }, action) => {
  switch (action.type) {
    case MONTHLY_SALES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case MONTHLY_SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        salesPerMonth: action.payload,
      };
    case MONTHLY_SALES_FAIL:
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

export const productSalesReducer = (state = { productSales: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SALES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PRODUCT_SALES_SUCCESS:
      return {
        ...state,
        loading: false,
        productSales: action.payload,
      };
    case PRODUCT_SALES_FAIL:
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

export const incomePerMonthReducer = (
  state = { incomePerMonth: [] },
  action
) => {
  switch (action.type) {
    case MONTHLY_INCOME_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case MONTHLY_INCOME_SUCCESS:
      return {
        ...state,
        loading: false,
        incomePerMonth: action.payload,
      };
    case MONTHLY_INCOME_FAIL:
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

export const expensesPerMonthReducer = (
  state = { expensesPerMonth: [] },
  action
) => {
  switch (action.type) {
    case MONTHLY_EXPENSES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case MONTHLY_EXPENSES_SUCCESS:
      return {
        ...state,
        loading: false,
        expensesPerMonth: action.payload,
      };
    case MONTHLY_EXPENSES_FAIL:
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
