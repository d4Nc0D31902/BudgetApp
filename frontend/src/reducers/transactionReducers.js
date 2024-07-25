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

export const newTransactionReducer = (state = { transaction: {} }, action) => {
  switch (action.type) {
    case NEW_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_TRANSACTION_SUCCESS:
      return {
        loading: false,
        success: true,
        transaction: action.payload.transaction,
      };
    case NEW_TRANSACTION_FAIL:
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

export const allTransactionsReducer = (
  state = { transactions: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_TRANSACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ALL_TRANSACTIONS_SUCCESS:
      return {
        loading: false,
        transactions: action.payload.transactions,
        count: action.payload.count,
      };
    case GET_ALL_TRANSACTIONS_FAIL:
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

export const singleTransactionReducer = (
  state = { transaction: {} },
  action
) => {
  switch (action.type) {
    case GET_SINGLE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_SINGLE_TRANSACTION_SUCCESS:
      return {
        loading: false,
        transaction: action.payload.transaction,
      };
    case GET_SINGLE_TRANSACTION_FAIL:
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

export const updateTransactionReducer = (
  state = { transaction: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TRANSACTION_SUCCESS:
      return {
        loading: false,
        success: true,
        transaction: action.payload.transaction,
      };
    case UPDATE_TRANSACTION_FAIL:
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

export const deleteTransactionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        loading: false,
        success: true,
        message: action.payload.message,
      };
    case DELETE_TRANSACTION_FAIL:
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

export const processTransactionReducer = (
  state = { transaction: {}, entry: {} },
  action
) => {
  switch (action.type) {
    case PROCESS_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROCESS_TRANSACTION_SUCCESS:
      return {
        loading: false,
        success: true,
        transaction: action.payload.transaction,
        entry: action.payload.entry,
      };
    case PROCESS_TRANSACTION_FAIL:
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
