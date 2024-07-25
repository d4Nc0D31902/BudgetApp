import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import Sidebar from "../admin/Sidebar";

import { useDispatch, useSelector } from "react-redux";

import {
  getAdminExpenses,
  deleteExpenses,
  clearErrors,
} from "../../actions/expensesActions";

import { DELETE_EXPENSES_RESET } from "../../constants/expensesConstants";

const ExpensesList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, expensesEntries } = useSelector(
    (state) => state.expensesEntries
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.expenses
  );
  useEffect(() => {
    dispatch(getAdminExpenses());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      navigate("/expenses-list");
      dispatch({ type: DELETE_EXPENSES_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  // const setExpenses = () => {
  //   const data = {
  //     columns: [
  //       {
  //         label: "Description",
  //         field: "description",
  //         sort: "asc",
  //       },
  //       {
  //         label: "Amount",
  //         field: "amount",
  //         sort: "asc",
  //       },
  //       {
  //         label: "Date",
  //         field: "date",
  //         sort: "asc",
  //       },
  //       {
  //         label: "Actions",
  //         field: "actions",
  //       },
  //     ],
  //     rows: [],
  //   };

  //   if (expensesEntries) {
  //     expensesEntries.forEach((expense) => {
  //       data.rows.push({
  //         id: expense._id,
  //         description: expense.description,
  //         amount: `₱${expense.amount}`,
  //         date: new Date(expense.date).toLocaleDateString(),
  //         actions: (
  //           <Fragment>
  //             <Link
  //               to={`/expenses/${expense._id}/update`}
  //               className="btn btn-primary py-1 px-2"
  //             >
  //               <i className="fa fa-pencil"></i>
  //             </Link>
  //             <button
  //               className="btn btn-danger py-1 px-2 ml-2"
  //               onClick={() => deleteExpensesHandler(expense._id)}
  //             >
  //               <i className="fa fa-trash"></i>
  //             </button>
  //           </Fragment>
  //         ),
  //       });
  //     });
  //   }

  //   return data;
  // };

  const setExpenses = () => {
    const data = {
      columns: [
        {
          label: "Description",
          field: "description",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Date",
          field: "date",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    const sortedExpenses = expensesEntries
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedExpenses.forEach((expense) => {
      data.rows.push({
        id: expense._id,
        description: expense.description,
        // amount: `₱${expense.amount}`,
        amount: `₱${parseFloat(expense.amount).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        date: new Date(expense.date).toLocaleDateString(),
        actions: (
          <Fragment>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteExpensesHandler(expense._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteExpensesHandler = (id) => {
    dispatch(deleteExpenses(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Expenses"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Expenses</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setExpenses()}
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

export default ExpensesList;
