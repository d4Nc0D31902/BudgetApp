import axios from "axios";

import {
  NEW_TRANSACTION_REQUEST,
  NEW_TRANSACTION_SUCCESS,
  NEW_TRANSACTION_FAIL,
  GET_ALL_TRANSACTIONS_REQUEST,
  GET_ALL_TRANSACTIONS_SUCCESS,
  GET_ALL_TRANSACTIONS_FAIL,
  GET_SINGLE_TRANSACTION_REQUEST,
  GET_SINGLE_TRANSACTION_SUCCESS,
  GET_SINGLE_TRANSACTION_FAIL,
  UPDATE_TRANSACTION_REQUEST,
  UPDATE_TRANSACTION_SUCCESS,
  UPDATE_TRANSACTION_FAIL,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAIL,
  PROCESS_TRANSACTION_REQUEST,
  PROCESS_TRANSACTION_SUCCESS,
  PROCESS_TRANSACTION_FAIL,
  CLEAR_ERRORS,
} from "../constants/transactionConstants";

// Create new transaction
export const newTransaction = (transactionData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_TRANSACTION_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/transactions`,
      transactionData,
      config
    );
    dispatch({
      type: NEW_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_TRANSACTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get all transactions
export const getAllTransactions = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_TRANSACTIONS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/transactions`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: GET_ALL_TRANSACTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TRANSACTIONS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get single transaction by ID
export const getSingleTransaction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_TRANSACTION_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/transactions/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: GET_SINGLE_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TRANSACTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update transaction by ID
export const updateTransaction = (id, transactionData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TRANSACTION_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/transactions/${id}`,
      transactionData,
      config
    );
    dispatch({
      type: UPDATE_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TRANSACTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete transaction by ID
export const deleteTransaction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TRANSACTION_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/transactions/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TRANSACTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Process transaction
export const processTransaction = (transactionData) => async (dispatch) => {
  try {
    dispatch({ type: PROCESS_TRANSACTION_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/transaction`,
      transactionData,
      config
    );
    dispatch({
      type: PROCESS_TRANSACTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROCESS_TRANSACTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
