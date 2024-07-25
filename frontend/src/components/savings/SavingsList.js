import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import Sidebar from "../admin/Sidebar";

import { useDispatch, useSelector } from "react-redux";

import {
  getAdminSavings,
  deleteSavings,
  clearErrors,
} from "../../actions/savingsActions";

import { DELETE_SAVINGS_RESET } from "../../constants/savingsConstants";

const SavingsList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, savingsEntries } = useSelector(
    (state) => state.savingsEntries
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.savings
  );
  useEffect(() => {
    dispatch(getAdminSavings());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      navigate("/savings-list");
      dispatch({ type: DELETE_SAVINGS_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  const setSavings = () => {
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

    const sortedSavingsEntries = savingsEntries
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedSavingsEntries.forEach((saving) => {
      data.rows.push({
        id: saving._id,
        description: saving.description,
        // amount: `₱${saving.amount}`,
        amount: `₱${parseFloat(saving.amount).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
        date: new Date(saving.date).toLocaleDateString(),
        actions: (
          <Fragment>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteSavingsHandler(saving._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteSavingsHandler = (id) => {
    dispatch(deleteSavings(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Savings"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Savings</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setSavings()}
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

export default SavingsList;
