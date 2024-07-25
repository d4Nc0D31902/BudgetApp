import axios from "axios";

import {
  CASH_DETAILS_REQUEST,
  CASH_DETAILS_SUCCESS,
  CASH_DETAILS_FAIL,
  ADMIN_CASH_REQUEST,
  ADMIN_CASH_SUCCESS,
  ADMIN_CASH_FAIL,
  NEW_CASH_REQUEST,
  NEW_CASH_SUCCESS,
  NEW_CASH_FAIL,
  DELETE_CASH_REQUEST,
  DELETE_CASH_SUCCESS,
  DELETE_CASH_FAIL,
  UPDATE_CASH_REQUEST,
  UPDATE_CASH_SUCCESS,
  UPDATE_CASH_FAIL,
  CLEAR_ERRORS,
  TOTAL_CASH_REQUEST,
  TOTAL_CASH_SUCCESS,
  TOTAL_CASH_FAIL,
  ADD_CASH_REQUEST,
  ADD_CASH_SUCCES,
  ADD_CASH_FAIL,
} from "../constants/cashConstants";

export const getCashDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CASH_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/cash/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: CASH_DETAILS_SUCCESS,
      payload: data.cashEntry,
    });
  } catch (error) {
    dispatch({
      type: CASH_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminCash = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CASH_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/cash`,
      {
        withCredentials: true,
      }
    );
    console.log("Data received from server:", data); // Log data here
    dispatch({
      type: ADMIN_CASH_SUCCESS,
      payload: data.cashEntries,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CASH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newCash = (cashData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CASH_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/cash/new`,
      cashData,
      config
    );
    dispatch({
      type: NEW_CASH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CASH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteCash = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CASH_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/cash/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_CASH_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CASH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCash = (id, cashData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CASH_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/cash/${id}`,
      cashData,
      config
    );
    dispatch({
      type: UPDATE_CASH_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CASH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getTotalCashAmount = () => async (dispatch) => {
  try {
    dispatch({ type: TOTAL_CASH_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/total-cash`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: TOTAL_CASH_SUCCESS,
      payload: data.totalAmount,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_CASH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addCashAmount = (id, amount) => async (dispatch) => {
  try {
    dispatch({ type: ADD_CASH_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/cash/add/${id}`,
      { amount },
      config
    );

    dispatch({
      type: ADD_CASH_SUCCES,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_CASH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
