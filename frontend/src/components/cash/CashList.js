import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import Sidebar from "../admin/Sidebar";

import { useDispatch, useSelector } from "react-redux";

import {
  getAdminCash,
  deleteCash,
  clearErrors,
} from "../../actions/cashActions";

import { DELETE_CASH_RESET } from "../../constants/cashConstants";

const CashList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, cashEntries } = useSelector(
    (state) => state.cashEntries
  );
  const { error: deleteError, isDeleted } = useSelector((state) => state.cash);
  useEffect(() => {
    dispatch(getAdminCash());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      navigate("/cash-list");
      dispatch({ type: DELETE_CASH_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  const setCash = () => {
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

    if (cashEntries) {
      cashEntries.forEach((cash) => {
        data.rows.push({
          id: cash._id,
          description: cash.description,
          // amount: `₱${cash.amount
          //   .toFixed(2)
          //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
          amount: `₱${parseFloat(cash.amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          date: new Date(cash.date).toLocaleDateString(),
          // date: cash.date,
          actions: (
            <Fragment>
              <Link
                to={`/cash/${cash._id}/add`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-plus"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteCashHandler(cash._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          ),
        });
      });
    }

    return data;
  };

  const deleteCashHandler = (id) => {
    dispatch(deleteCash(id));
  };

  return (
    <Fragment>
      <MetaData title={"Cash List"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">Cash List</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setCash()}
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

export default CashList;
