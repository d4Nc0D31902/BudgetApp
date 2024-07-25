import axios from "axios";

import {
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  ADMIN_CATEGORY_REQUEST,
  ADMIN_CATEGORY_SUCCESS,
  ADMIN_CATEGORY_FAIL,
  NEW_CATEGORY_REQUEST,
  NEW_CATEGORY_SUCCESS,
  NEW_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  CLEAR_ERRORS,
} from "../constants/categoryConstants";

export const getCategoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/category/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: CATEGORY_DETAILS_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminCategory = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CATEGORY_REQUEST });
    const { data } = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/category`,
      {
        withCredentials: true,
      }
    );
    console.log("Data received from server:", data);
    dispatch({
      type: ADMIN_CATEGORY_SUCCESS,
      payload: data.categories,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CATEGORY_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/category/new`,
      categoryData,
      config
    );
    dispatch({
      type: NEW_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CATEGORY_REQUEST });
    const { data } = await axios.delete(
      `${process.env.REACT_APP_API}/api/v1/category/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCategory = (id, categoryData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CATEGORY_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/category/${id}`,
      categoryData,
      config
    );
    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
