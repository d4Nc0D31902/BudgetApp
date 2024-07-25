import axios from "axios";

import {
  EXPENSES_DETAILS_REQUEST,
  EXPENSES_DETAILS_SUCCESS,
  EXPENSES_DETAILS_FAIL,
  ADMIN_EXPENSES_REQUEST,
  ADMIN_EXPENSES_SUCCESS,
  ADMIN_EXPENSES_FAIL,
  NEW_EXPENSES_REQUEST,
  NEW_EXPENSES_SUCCESS,
  NEW_EXPENSES_FAIL,
  DELETE_EXPENSES_REQUEST,
  DELETE_EXPENSES_SUCCESS,
  DELETE_EXPENSES_FAIL,
  UPDATE_EXPENSES_REQUEST,
  UPDATE_EXPENSES_SUCCESS,
  UPDATE_EXPENSES_FAIL,
  CLEAR_ERRORS,
  TOTAL_EXPENSES_REQUEST,
  TOTAL_EXPENSES_SUCCESS,
  TOTAL_EXPENSES_FAIL,
} from "../constants/expensesConstants";

export const getExpensesDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EXPENSES_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/expenses/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: EXPENSES_DETAILS_SUCCESS,
      payload: data.expensesEntry,
    });
  } catch (error) {
    dispatch({
      type: EXPENSES_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminExpenses = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_EXPENSES_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/expenses`,
      {
        withCredentials: true,
      }
    );
    console.log("Data received from server:", data); // Log data here
    dispatch({
      type: ADMIN_EXPENSES_SUCCESS,
      payload: data.expensesEntries,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_EXPENSES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newExpenses = (expensesData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_EXPENSES_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/expenses/new`,
      expensesData,
      config
    );
    dispatch({
      type: NEW_EXPENSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_EXPENSES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteExpenses = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EXPENSES_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/expenses/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_EXPENSES_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EXPENSES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateExpenses = (id, expensesData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EXPENSES_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/expenses/${id}`,
      expensesData,
      config
    );
    dispatch({
      type: UPDATE_EXPENSES_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EXPENSES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getTotalExpenses = () => async (dispatch) => {
  try {
    dispatch({ type: TOTAL_EXPENSES_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/total-expenses`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: TOTAL_EXPENSES_SUCCESS,
      payload: data.totalExpenses,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_EXPENSES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
