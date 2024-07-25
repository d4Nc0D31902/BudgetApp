import {
  ATM_DETAILS_REQUEST,
  ATM_DETAILS_SUCCESS,
  ATM_DETAILS_FAIL,
  ADMIN_ATM_REQUEST,
  ADMIN_ATM_SUCCESS,
  ADMIN_ATM_FAIL,
  NEW_ATM_REQUEST,
  NEW_ATM_SUCCESS,
  NEW_ATM_RESET,
  NEW_ATM_FAIL,
  DELETE_ATM_REQUEST,
  DELETE_ATM_SUCCESS,
  DELETE_ATM_RESET,
  DELETE_ATM_FAIL,
  UPDATE_ATM_REQUEST,
  UPDATE_ATM_SUCCESS,
  UPDATE_ATM_RESET,
  UPDATE_ATM_FAIL,
  TOTAL_ATM_REQUEST,
  TOTAL_ATM_SUCCESS,
  TOTAL_ATM_FAIL,
  WITHDRAW_ATM_REQUEST,
  WITHDRAW_ATM_FAIL,
  WITHDRAW_ATM_SUCCESS,
  CLEAR_ERRORS,
  ADD_ATM_REQUEST,
  ADD_ATM_SUCCESS,
  ADD_ATM_FAIL,
} from "../constants/atmConstants";

export const atmEntriesReducer = (
  state = { loading: false, atmEntries: [], error: null },
  action
) => {
  switch (action.type) {
    case ADMIN_ATM_REQUEST:
      console.log("ADMIN_ATM_REQUEST dispatched");
      return {
        loading: true,
        atmEntries: [],
        error: null,
      };
    case ADMIN_ATM_FAIL:
      console.log("ADMIN_ATM_FAIL dispatched");
      return {
        loading: false,
        error: action.payload,
        atmEntries: [],
      };
    case ADMIN_ATM_SUCCESS:
      console.log("ADMIN_ATM_SUCCESS dispatched with payload:", action.payload);
      return {
        ...state,
        loading: false,
        atmEntries: action.payload,
        error: null,
      };
    case CLEAR_ERRORS:
      console.log("CLEAR_ERRORS dispatched");
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const atmEntryDetailsReducer = (state = { atmEntry: {} }, action) => {
  switch (action.type) {
    case ATM_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ATM_DETAILS_SUCCESS:
      return {
        loading: false,
        atmEntry: action.payload,
      };
    case ATM_DETAILS_FAIL:
      return {
        ...state,
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

export const newAtmEntryReducer = (state = { atmEntry: {} }, action) => {
  switch (action.type) {
    case NEW_ATM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_ATM_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        atmEntry: action.payload.atmEntry,
      };
    case NEW_ATM_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case NEW_ATM_RESET:
      return {
        ...state,
        success: false,
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

export const atmReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ATM_REQUEST:
    case UPDATE_ATM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ATM_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_ATM_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_ATM_FAIL:
    case UPDATE_ATM_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_ATM_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_ATM_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const totalAtmReducer = (
  state = { loading: false, totalAtm: 0, error: null },
  action
) => {
  switch (action.type) {
    case TOTAL_ATM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case TOTAL_ATM_SUCCESS:
      return {
        loading: false,
        totalAtm: action.payload,
        error: null,
      };
    case TOTAL_ATM_FAIL:
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

export const withdrawMoneyReducer = (
  state = { atmEntry: {}, cashEntry: {} },
  action
) => {
  switch (action.type) {
    case WITHDRAW_ATM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case WITHDRAW_ATM_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        atmEntry: action.payload.atmEntry,
        cashEntry: action.payload.cashEntry,
      };
    case WITHDRAW_ATM_FAIL:
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

export const atmAmountReducer = (
  state = { atmEntry: null, income: null, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case ADD_ATM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_ATM_SUCCESS:
      return {
        ...state,
        loading: false,
        atmEntry: action.payload.atmEntry,
        income: action.payload.income,
      };

    case ADD_ATM_FAIL:
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
