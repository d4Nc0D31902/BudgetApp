import axios from "axios";

import {
  BUDGET_DETAILS_REQUEST,
  BUDGET_DETAILS_SUCCESS,
  BUDGET_DETAILS_FAIL,
  ADMIN_BUDGET_REQUEST,
  ADMIN_BUDGET_SUCCESS,
  ADMIN_BUDGET_FAIL,
  NEW_BUDGET_REQUEST,
  NEW_BUDGET_SUCCESS,
  NEW_BUDGET_FAIL,
  DELETE_BUDGET_REQUEST,
  DELETE_BUDGET_SUCCESS,
  DELETE_BUDGET_FAIL,
  UPDATE_BUDGET_REQUEST,
  UPDATE_BUDGET_SUCCESS,
  UPDATE_BUDGET_FAIL,
  CLEAR_ERRORS,
} from "../constants/budgetConstants";

export const getBudgetDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: BUDGET_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/budget/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: BUDGET_DETAILS_SUCCESS,
      payload: data.budget,
    });
  } catch (error) {
    dispatch({
      type: BUDGET_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminBudget = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_BUDGET_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/budget`,
      {
        withCredentials: true,
      }
    );
    console.log("Data received from server:", data); // Log data here
    dispatch({
      type: ADMIN_BUDGET_SUCCESS,
      payload: data.budgets,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_BUDGET_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newBudget = (budgetData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BUDGET_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/budget/new`,
      budgetData,
      config
    );
    dispatch({
      type: NEW_BUDGET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_BUDGET_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteBudget = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BUDGET_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/budget/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_BUDGET_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_BUDGET_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateBudget = (id, budgetData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BUDGET_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/budget/${id}`,
      budgetData,
      config
    );
    dispatch({
      type: UPDATE_BUDGET_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BUDGET_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
