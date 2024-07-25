import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";

import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";

import CashList from "./components/cash/CashList";
import UpdateCash from "./components/cash/UpdateCash";
import NewCash from "./components/cash/NewCash";
import AddCash from "./components/cash/AddCash";

import AtmList from "./components/atm/AtmList";
import UpdateAtm from "./components/atm/UpdateAtm";
import NewAtm from "./components/atm/NewAtm";
import WithdrawForm from "./components/atm/Withdraw";
import AddATMAmount from "./components/atm/AddAtm";

import IncomeList from "./components/income/IncomeList";
import UpdateIncome from "./components/income/UpdateIncome";
import NewIncome from "./components/income/NewIncome";

import ExpensesList from "./components/expenses/ExpensesList";
import UpdateExpenses from "./components/expenses/UpdateExpenses";
import NewExpenses from "./components/expenses/NewExpenses";

import SavingsList from "./components/savings/SavingsList";
import UpdateSavings from "./components/savings/UpdateSavings";
import NewSavings from "./components/savings/UpdateSavings";

import TransactionList from "./components/transaction/TransactionList";
import NewTransaction from "./components/transaction/NewTransaction";

import CategoryList from "./components/admin/CategoryList";
import NewCategory from "./components/admin/NewCategory";
import UpdateCategory from "./components/admin/UpdateCategory";

import BudgetList from "./components/budget/BudgetList";
import NewBudget from "./components/budget/NewBudget";
import UpdateBudget from "./components/budget/UpdateBudget";

import Calculator from "./components/admin/Calculator";

import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import store from "./store";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route path="/product/:id" element={<ProductDetails />} exact="true" />
        <Route path="/search/:keyword" element={<Home />} exact="true" />
        <Route path="/login" element={<Login />} exact="true" />
        <Route path="/register" element={<Register />} exact="true" />
        <Route
          path="/password/forgot"
          element={<ForgotPassword />}
          exact="true"
        />
        <Route
          path="/password/reset/:token"
          element={<NewPassword />}
          exact="true"
        />
        <Route path="/cart" element={<Cart />} exact="true" />
        <Route
          path="/me"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <Shipping />
            </ProtectedRoute>
          }
          exact="true"
        />
        <Route
          path="/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders/me"
          element={
            <ProtectedRoute>
              <ListOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <Dashboard />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product"
          element={
            <ProtectedRoute isAdmin={true}>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute isAdmin={true}>
              <OrdersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <ProductReviews />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cash-list"
          element={
            <ProtectedRoute>
              <CashList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cash/:id/add"
          element={
            <ProtectedRoute>
              {/* <UpdateCash /> */}
              <AddCash />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cash/new"
          element={
            <ProtectedRoute>
              <NewCash />
            </ProtectedRoute>
          }
        />

        <Route
          path="/atm-list"
          element={
            <ProtectedRoute>
              <AtmList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/atm/:id/add"
          element={
            <ProtectedRoute>
              {/* <UpdateAtm /> */}
              <AddATMAmount />
            </ProtectedRoute>
          }
        />

        <Route
          path="/atm/new"
          element={
            <ProtectedRoute>
              <NewAtm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/income-list"
          element={
            <ProtectedRoute>
              <IncomeList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/income/:id/update"
          element={
            <ProtectedRoute>
              <UpdateIncome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/income/new"
          element={
            <ProtectedRoute>
              <NewIncome />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses-list"
          element={
            <ProtectedRoute>
              <ExpensesList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses/:id/update"
          element={
            <ProtectedRoute>
              <UpdateExpenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/expenses/new"
          element={
            <ProtectedRoute>
              <NewExpenses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/savings-list"
          element={
            <ProtectedRoute>
              <SavingsList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/savings/new"
          element={
            <ProtectedRoute>
              <NewSavings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/savings/:id/update"
          element={
            <ProtectedRoute>
              <UpdateSavings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transaction-list"
          element={
            <ProtectedRoute>
              <TransactionList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transaction/new"
          element={
            <ProtectedRoute>
              <NewTransaction />
            </ProtectedRoute>
          }
        />

        <Route
          path="/atm/withdraw"
          element={
            <ProtectedRoute>
              <WithdrawForm />
            </ProtectedRoute>
          }
        />

        <Route
          path="/category-list"
          element={
            <ProtectedRoute>
              <CategoryList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/category/new"
          element={
            <ProtectedRoute>
              <NewCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/category/:id/update"
          element={
            <ProtectedRoute>
              <UpdateCategory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/budget-list"
          element={
            <ProtectedRoute>
              <BudgetList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/budget/new"
          element={
            <ProtectedRoute>
              <NewBudget />
            </ProtectedRoute>
          }
        />

        <Route
          path="/budget/:id/update"
          element={
            <ProtectedRoute>
              <UpdateBudget />
            </ProtectedRoute>
          }
        />

        <Route
          path="/calculator"
          element={
            <ProtectedRoute>
              <Calculator />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
    </div>
  );
}

export default App;
