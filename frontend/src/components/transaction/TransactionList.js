import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllTransactions,
  deleteTransaction,
  clearErrors,
} from "../../actions/transactionActions";

import { DELETE_TRANSACTION_RESET } from "../../constants/transactionConstants";

const TransactionList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const { loading, error, transactions } = useSelector(
    (state) => state.allTransactions
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteTransaction
  );
  useEffect(() => {
    dispatch(getAllTransactions());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      navigate("/transaction-list");
      dispatch({ type: DELETE_TRANSACTION_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  const setTransactions = () => {
    const data = {
      columns: [
        {
          label: "Account",
          field: "account",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Category",
          field: "category",
          sort: "asc",
        },
        {
          label: "Notes",
          field: "notes",
          sort: "asc",
        },
        {
          label: "Date",
          field: "date",
          sort: "asc",
        },
      ],
      rows: [],
    };

    const sortedTransactions = transactions
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedTransactions.forEach((transaction) => {
      data.rows.push({
        id: transaction._id,
        account: transaction.account,
        // amount: `₱${transaction.amount}`,
        amount: `₱${parseFloat(transaction.amount).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        category: transaction.category,
        notes: transaction.notes,
        date: new Date(transaction.date).toLocaleDateString(),
      });
    });

    return data;
  };

  const deleteTransactionHandler = async (id) => {
    try {
      await dispatch(deleteTransaction(id));
      dispatch(getAllTransactions());
      successMsg("Transaction Deleted Successfully");
    } catch (error) {
      errMsg("Error Deleting Transaction!");
    }
  };

  return (
    <Fragment>
      <MetaData title={"All Transactions"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Transactions</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setTransactions()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default TransactionList;
