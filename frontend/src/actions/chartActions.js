import axios from "axios";
import {
  MONTHLY_SALES_REQUEST,
  MONTHLY_SALES_SUCCESS,
  MONTHLY_SALES_FAIL,
  PRODUCT_SALES_REQUEST,
  PRODUCT_SALES_SUCCESS,
  PRODUCT_SALES_FAIL,
  MONTHLY_INCOME_REQUEST,
  MONTHLY_INCOME_SUCCESS,
  MONTHLY_INCOME_FAIL,
  MONTHLY_EXPENSES_REQUEST,
  MONTHLY_EXPENSES_SUCCESS,
  MONTHLY_EXPENSES_FAIL,
  CLEAR_ERRORS,
} from "../constants/chartConstants";
export const monthlySalesChart = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: MONTHLY_SALES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/orders/sales-per-month`,
      config
    );
    dispatch({
      type: MONTHLY_SALES_SUCCESS,
      payload: data.salesPerMonth,
    });
  } catch (error) {
    dispatch({
      type: MONTHLY_SALES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const productSalesChart = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    dispatch({ type: PRODUCT_SALES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/admin/products/sales`,
      config
    );
    dispatch({
      type: PRODUCT_SALES_SUCCESS,
      payload: data.totalPercentage,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: PRODUCT_SALES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getIncomePerMonth = () => async (dispatch) => {
  try {
    dispatch({ type: MONTHLY_INCOME_REQUEST });
    console.log("Fetching income per month...");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/income-perMonth`,
      config
    );
    console.log("Income per month data:", data.incomePerMonth);
    dispatch({
      type: MONTHLY_INCOME_SUCCESS,
      payload: data.incomePerMonth,
    });
  } catch (error) {
    console.error("Error fetching income per month:", error);
    dispatch({
      type: MONTHLY_INCOME_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getExpensesPerMonth = () => async (dispatch) => {
  try {
    dispatch({ type: MONTHLY_EXPENSES_REQUEST });
    console.log("Fetching expenses per month...");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/expenses-perMonth`,
      config
    );
    console.log("Expenses per month data:", data.expensesPerMonth);
    dispatch({
      type: MONTHLY_EXPENSES_SUCCESS,
      payload: data.expensesPerMonth,
    });
  } catch (error) {
    console.error("Error fetching expenses per month:", error);
    dispatch({
      type: MONTHLY_EXPENSES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
