import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import Sidebar from "../admin/Sidebar";

import { useDispatch, useSelector } from "react-redux";

import {
  getAdminIncome,
  deleteIncome,
  clearErrors,
} from "../../actions/incomeActions";

import { DELETE_INCOME_RESET } from "../../constants/incomeConstants";

const IncomeList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, incomeEntries } = useSelector(
    (state) => state.incomeEntries
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.income
  );
  useEffect(() => {
    dispatch(getAdminIncome());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      navigate("/income-list");
      dispatch({ type: DELETE_INCOME_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  const setIncome = () => {
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

    const sortedIncomeEntries = incomeEntries
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedIncomeEntries.forEach((income) => {
      data.rows.push({
        id: income._id,
        description: income.description,
        // amount: `₱${income.amount
        //   .toFixed(2)
        //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
        amount: `₱${parseFloat(income.amount).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        date: new Date(income.date).toLocaleDateString(),
        actions: (
          <Fragment>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteIncomeHandler(income._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteIncomeHandler = (id) => {
    dispatch(deleteIncome(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Incomes"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Incomes</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setIncome()}
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

export default IncomeList;
