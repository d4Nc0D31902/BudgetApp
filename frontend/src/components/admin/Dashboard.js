import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "./Sidebar";
import UserSalesChart from "./UserSalesChart";
import MonthlySalesChart from "./MonthlySalesChart";
import ProductSalesChart from "./ProductSalesChart";
import MostExpenses from "./MostExpenses";
import { useDispatch, useSelector } from "react-redux";
import { getTotalCashAmount } from "../../actions/cashActions";
import { getTotalSavings } from "../../actions/savingsActions";
import { getTotalAtmAmount } from "../../actions/atmActions";
import { getTotalIncome } from "../../actions/incomeActions";
import { getAdminBudget } from "../../actions/budgetActions";
import {
  getTotalExpenses,
  getAdminExpenses,
} from "../../actions/expensesActions";
import {
  getIncomePerMonth,
  getExpensesPerMonth,
} from "../../actions/chartActions";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { totalAmount } = useSelector((state) => state.totalCash);
  const { totalSavings } = useSelector((state) => state.totalSavings);
  const { totalAtm } = useSelector((state) => state.totalAtm);
  const { totalIncome } = useSelector((state) => state.totalIncome);
  const { incomePerMonth } = useSelector((state) => state.incomePerMonth);
  const { expensesPerMonth } = useSelector((state) => state.expensesPerMonth);
  const { expensesEntries } = useSelector((state) => state.expensesEntries);
  const { budgets } = useSelector((state) => state.budgets);
  const { totalExpenses, loading } = useSelector(
    (state) => state.totalExpenses
  );

  const totalBalance = (totalAmount ?? 0) + (totalAtm ?? 0);

  const formattedTotalBalance = totalBalance
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const rows = [
    { id: 1, description: "Groceries", amount: 5000 },
    { id: 2, description: "Utilities", amount: 2000 },
    { id: 3, description: "Rent", amount: 10000 },
  ];

  useEffect(() => {
    dispatch(getTotalCashAmount());
    dispatch(getTotalSavings());
    dispatch(getTotalAtmAmount());
    dispatch(getTotalIncome());
    dispatch(getTotalExpenses());
    dispatch(getIncomePerMonth());
    dispatch(getExpensesPerMonth());
    dispatch(getAdminExpenses());
    dispatch(getAdminBudget());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <h1 className="my-4">Analytics</h1>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
              <MetaData title={"Analytics"} />
              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Savings
                        <br />
                        <b>
                          ₱
                          {totalSavings &&
                            totalSavings
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pr-4">
                <div className="col-xl-12 col-sm-12 mb-3">
                  <div className="card text-white bg-primary o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Balance
                        <br />
                        <b>₱{formattedTotalBalance}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pr-4">
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Cash Balance
                        <br />{" "}
                        <b>
                          ₱
                          {totalAmount &&
                            totalAmount
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </b>
                      </div>
                    </div>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/cash-list"
                    >
                      <span className="float-left">View Details</span>

                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-info o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Card Balance
                        <br />{" "}
                        <b>
                          ₱
                          {totalAtm &&
                            totalAtm
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </b>
                      </div>
                    </div>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/atm-list"
                    >
                      <span className="float-left">View Details</span>

                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-success o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Income
                        <br />
                        <b>
                          ₱
                          {totalIncome &&
                            totalIncome
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </b>
                      </div>
                    </div>

                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/income-list"
                    >
                      <span className="float-left">View Details</span>

                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 mb-3">
                  <div className="card text-white bg-danger o-hidden h-100">
                    <div className="card-body">
                      <div className="text-center card-font-size">
                        Total Expenses
                        <br />
                        <b>
                          ₱
                          {totalExpenses &&
                            totalExpenses
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </b>
                      </div>
                    </div>
                    <Link
                      className="card-footer text-white clearfix small z-1"
                      to="/expenses-list"
                    >
                      <span className="float-left">View Details</span>

                      <span className="float-right">
                        <i className="fa fa-angle-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <Fragment>
                <h1
                  style={{
                    textAlign: "center",
                    marginTop: "50px",
                    marginBottom: "20px",
                  }}
                >
                  Budget List
                </h1>
                <TableContainer
                  elevation={6}
                  component={Paper}
                  style={{
                    width: "50%",
                    margin: "auto",
                    maxHeight: "400px",
                    overflowY: "auto",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold" }}>
                          Description
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: "bold" }}>
                          Amount
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {budgets.map((budgetItem) => (
                        <TableRow key={budgetItem.id}>
                          <TableCell component="th" scope="row">
                            {budgetItem.description}
                          </TableCell>
                          <TableCell align="right">
                            ₱
                            {budgetItem.amount
                              .toFixed(2)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Fragment>

              <Fragment>
                <h1 style={{ textAlign: "center", marginTop: "50px" }}>
                  Monthly Income
                </h1>
                <MonthlySalesChart data={incomePerMonth} />
              </Fragment>
              <Fragment>
                <h1 style={{ textAlign: "center", marginTop: "50px" }}>
                  Monthly Expenses
                </h1>
                <MonthlySalesChart data={expensesPerMonth} />
              </Fragment>

              <Fragment>
                <h1 style={{ textAlign: "center", marginTop: "50px" }}>
                  Most Expenses
                </h1>
                <MostExpenses data={expensesEntries} />
              </Fragment>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
