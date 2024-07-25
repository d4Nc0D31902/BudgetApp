import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducers";
import {
  authReducer,
  userReducer,
  forgotPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
  customerSalesReducer,
} from "./reducers/userReducers";

import { cartReducer } from "./reducers/cartReducers";

import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  orderReducer,
} from "./reducers/orderReducers";

import {
  salesPerMonthReducer,
  productSalesReducer,
  incomePerMonthReducer,
  expensesPerMonthReducer,
} from "./reducers/chartReducers";

import {
  cashEntriesReducer,
  cashEntryDetailsReducer,
  newCashEntryReducer,
  cashReducer,
  totalCashReducer,
  addAmountReducer,
} from "./reducers/cashReducers";

import {
  atmEntriesReducer,
  atmEntryDetailsReducer,
  atmReducer,
  newAtmEntryReducer,
  totalAtmReducer,
  withdrawMoneyReducer,
  atmAmountReducer,
} from "./reducers/atmReducers";

import {
  incomeEntriesReducer,
  incomeEntryDetailsReducer,
  incomeReducer,
  newIncomeEntryReducer,
  totalIncomeReducer,
} from "./reducers/incomeReducers";

import {
  expensesEntriesReducer,
  expensesEntryDetailsReducer,
  expensesReducer,
  newExpensesEntryReducer,
  totalExpensesReducer,
} from "./reducers/expensesReducers";

import {
  savingsEntriesReducer,
  savingsEntryDetailsReducer,
  savingsReducer,
  newSavingsEntryReducer,
  totalSavingsReducer,
} from "./reducers/savingsReducers";

import {
  newTransactionReducer,
  singleTransactionReducer,
  allTransactionsReducer,
  deleteTransactionReducer,
  updateTransactionReducer,
  processTransactionReducer,
} from "./reducers/transactionReducers";

import {
  categoriesReducer,
  newCategoryReducer,
  categoryDetailsReducer,
  categoryReducer,
} from "./reducers/categoryReducers";

import {
  newBudgetReducer,
  budgetDetailsReducer,
  budgetReducer,
  budgetsReducer,
} from "./reducers/budgetReducers";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  customerSales: customerSalesReducer,
  salesPerMonth: salesPerMonthReducer,
  productSales: productSalesReducer,
  cashEntries: cashEntriesReducer,
  cashEntryDetails: cashEntryDetailsReducer,
  newCashEntry: newCashEntryReducer,
  cash: cashReducer,
  atmEntries: atmEntriesReducer,
  atmEntryDetails: atmEntryDetailsReducer,
  atm: atmReducer,
  newAtmEntry: newAtmEntryReducer,
  incomeEntries: incomeEntriesReducer,
  incomeEntryDetails: incomeEntryDetailsReducer,
  income: incomeReducer,
  newIncomeEntry: newIncomeEntryReducer,
  expensesEntries: expensesEntriesReducer,
  expensesEntryDetails: expensesEntryDetailsReducer,
  expenses: expensesReducer,
  newExpensesEntry: newExpensesEntryReducer,
  savingsEntries: savingsEntriesReducer,
  savingsEntryDetails: savingsEntryDetailsReducer,
  savings: savingsReducer,
  newSavingsEntry: newSavingsEntryReducer,
  newTransaction: newTransactionReducer,
  singleTransaction: singleTransactionReducer,
  allTransactions: allTransactionsReducer,
  deleteTransaction: deleteTransactionReducer,
  updateTransaction: updateTransactionReducer,
  processTransaction: processTransactionReducer,
  totalCash: totalCashReducer,
  totalSavings: totalSavingsReducer,
  totalAtm: totalAtmReducer,
  totalIncome: totalIncomeReducer,
  totalExpenses: totalExpensesReducer,
  withdrawMoney: withdrawMoneyReducer,
  incomePerMonth: incomePerMonthReducer,
  atmAmount: atmAmountReducer,
  addAmount: addAmountReducer,
  expensesPerMonth: expensesPerMonthReducer,
  categories: categoriesReducer,
  newCategory: newCategoryReducer,
  categoryDetails: categoryDetailsReducer,
  category: categoryReducer,
  newBudget: newBudgetReducer,
  budgetDetails: budgetDetailsReducer,
  budget: budgetReducer,
  budgets: budgetsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
