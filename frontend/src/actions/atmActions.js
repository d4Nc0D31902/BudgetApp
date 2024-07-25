import axios from "axios";

import {
  ATM_DETAILS_REQUEST,
  ATM_DETAILS_SUCCESS,
  ATM_DETAILS_FAIL,
  ADMIN_ATM_REQUEST,
  ADMIN_ATM_SUCCESS,
  ADMIN_ATM_FAIL,
  NEW_ATM_REQUEST,
  NEW_ATM_SUCCESS,
  NEW_ATM_FAIL,
  DELETE_ATM_REQUEST,
  DELETE_ATM_SUCCESS,
  DELETE_ATM_FAIL,
  UPDATE_ATM_REQUEST,
  UPDATE_ATM_SUCCESS,
  UPDATE_ATM_FAIL,
  TOTAL_ATM_FAIL,
  TOTAL_ATM_REQUEST,
  TOTAL_ATM_SUCCESS,
  CLEAR_ERRORS,
  WITHDRAW_ATM_REQUEST,
  WITHDRAW_ATM_SUCCESS,
  WITHDRAW_ATM_FAIL,
  ADD_ATM_REQUEST,
  ADD_ATM_SUCCESS,
  ADD_ATM_FAIL,
} from "../constants/atmConstants";

export const getAtmDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ATM_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/atm/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: ATM_DETAILS_SUCCESS,
      payload: data.atmEntry,
    });
  } catch (error) {
    dispatch({
      type: ATM_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminAtm = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_ATM_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/atm`,
      {
        withCredentials: true,
      }
    );
    console.log("Data received from server:", data); // Log data here
    dispatch({
      type: ADMIN_ATM_SUCCESS,
      payload: data.atmEntries,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ATM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newAtm = (atmData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_ATM_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/atm/new`,
      atmData,
      config
    );
    dispatch({
      type: NEW_ATM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ATM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteAtm = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ATM_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/atm/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_ATM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ATM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateAtm = (id, atmData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ATM_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/atm/${id}`,
      atmData,
      config
    );
    dispatch({
      type: UPDATE_ATM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ATM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getTotalAtmAmount = () => async (dispatch) => {
  try {
    dispatch({ type: TOTAL_ATM_REQUEST });

    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/total-atm`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: TOTAL_ATM_SUCCESS,
      payload: data.totalAtm,
    });
  } catch (error) {
    dispatch({
      type: TOTAL_ATM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const withdrawMoney = (amount) => async (dispatch) => {
  try {
    dispatch({ type: WITHDRAW_ATM_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/atm/withdraw`,
      { amount },
      config
    );

    dispatch({
      type: WITHDRAW_ATM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: WITHDRAW_ATM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const addAtmAmount = (id, amount) => async (dispatch) => {
  try {
    dispatch({ type: ADD_ATM_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/atm/add/${id}`,
      { amount },
      config
    );

    dispatch({
      type: ADD_ATM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ATM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
