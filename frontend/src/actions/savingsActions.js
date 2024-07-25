import axios from "axios";

import {
  SAVINGS_DETAILS_REQUEST,
  SAVINGS_DETAILS_SUCCESS,
  SAVINGS_DETAILS_FAIL,
  ADMIN_SAVINGS_REQUEST,
  ADMIN_SAVINGS_SUCCESS,
  ADMIN_SAVINGS_FAIL,
  NEW_SAVINGS_REQUEST,
  NEW_SAVINGS_SUCCESS,
  NEW_SAVINGS_FAIL,
  DELETE_SAVINGS_REQUEST,
  DELETE_SAVINGS_SUCCESS,
  DELETE_SAVINGS_FAIL,
  UPDATE_SAVINGS_REQUEST,
  UPDATE_SAVINGS_SUCCESS,
  UPDATE_SAVINGS_FAIL,
  TOTAL_SAVINGS_FAIL,
  TOTAL_SAVINGS_REQUEST,
  TOTAL_SAVINGS_SUCCESS,
  CLEAR_ERRORS,
} from "../constants/savingsConstants";

export const getSavingsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SAVINGS_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/savings/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: SAVINGS_DETAILS_SUCCESS,
      payload: data.savingsEntry,
    });
  } catch (error) {
    dispatch({
      type: SAVINGS_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminSavings = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_SAVINGS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/savings`,
      {
        withCredentials: true,
      }
    );
    console.log("Data received from server:", data); 
    dispatch({
      type: ADMIN_SAVINGS_SUCCESS,
      payload: data.savingsEntries,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_SAVINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newSavings = (savingsData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SAVINGS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/savings/new`,
      savingsData,
      config
    );
    dispatch({
      type: NEW_SAVINGS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_SAVINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteSavings = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SAVINGS_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/savings/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_SAVINGS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SAVINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateSavings = (id, savingsData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SAVINGS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/savings/${id}`,
      savingsData,
      config
    );
    dispatch({
      type: UPDATE_SAVINGS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SAVINGS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getTotalSavings = () => async (dispatch) => {
  try {
    dispatch({ type: TOTAL_SAVINGS_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/total-savings`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: TOTAL_SAVINGS_SUCCESS,
      payload: data.totalSavings,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_SAVINGS_FAIL,
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
