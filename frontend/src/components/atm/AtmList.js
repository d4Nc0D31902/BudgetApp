import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import Sidebar from "../admin/Sidebar";

import { useDispatch, useSelector } from "react-redux";

import { getAdminAtm, deleteAtm, clearErrors } from "../../actions/atmActions";

import { DELETE_ATM_RESET } from "../../constants/atmConstants";

const AtmList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, atmEntries } = useSelector(
    (state) => state.atmEntries
  );
  const { error: deleteError, isDeleted } = useSelector((state) => state.atm);
  useEffect(() => {
    dispatch(getAdminAtm());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      navigate("/atm-list");
      dispatch({ type: DELETE_ATM_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  const setAtm = () => {
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

    if (atmEntries) {
      atmEntries.forEach((atm) => {
        data.rows.push({
          id: atm._id,
          description: atm.description,
          // amount: `₱${atm.amount
          //   .toFixed(2)
          //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
          amount: `₱${parseFloat(atm.amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          date: new Date(atm.date).toLocaleDateString(),
          actions: (
            <Fragment>
              <Link
                to={`/atm/${atm._id}/add`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-plus"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteAtmHandler(atm._id)}
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

  const deleteAtmHandler = (id) => {
    dispatch(deleteAtm(id));
  };

  return (
    <Fragment>
      <MetaData title={"Card List"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">Card List</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setAtm()}
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

export default AtmList;
