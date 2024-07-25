import axios from "axios";

import {
  INCOME_DETAILS_REQUEST,
  INCOME_DETAILS_SUCCESS,
  INCOME_DETAILS_FAIL,
  ADMIN_INCOME_REQUEST,
  ADMIN_INCOME_SUCCESS,
  ADMIN_INCOME_FAIL,
  NEW_INCOME_REQUEST,
  NEW_INCOME_SUCCESS,
  NEW_INCOME_FAIL,
  DELETE_INCOME_REQUEST,
  DELETE_INCOME_SUCCESS,
  DELETE_INCOME_FAIL,
  UPDATE_INCOME_REQUEST,
  UPDATE_INCOME_SUCCESS,
  UPDATE_INCOME_FAIL,
  CLEAR_ERRORS,
  TOTAL_INCOME_REQUEST,
  TOTAL_INCOME_SUCCESS,
  TOTAL_INCOME_FAIL,
} from "../constants/incomeConstants";

export const getIncomeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: INCOME_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/income/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: INCOME_DETAILS_SUCCESS,
      payload: data.incomeEntry,
    });
  } catch (error) {
    dispatch({
      type: INCOME_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminIncome = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_INCOME_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/income`,
      {
        withCredentials: true,
      }
    );
    console.log("Data received from server:", data); // Log data here
    dispatch({
      type: ADMIN_INCOME_SUCCESS,
      payload: data.incomeEntries,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_INCOME_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newIncome = (incomeData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_INCOME_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/income/new`,
      incomeData,
      config
    );
    dispatch({
      type: NEW_INCOME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_INCOME_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteIncome = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_INCOME_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/income/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_INCOME_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_INCOME_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateIncome = (id, incomeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_INCOME_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/income/${id}`,
      incomeData,
      config
    );
    dispatch({
      type: UPDATE_INCOME_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_INCOME_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getTotalIncome = () => async (dispatch) => {
  try {
    dispatch({ type: TOTAL_INCOME_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/total-income`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: TOTAL_INCOME_SUCCESS,
      payload: data.totalIncome,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_INCOME_FAIL,
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
