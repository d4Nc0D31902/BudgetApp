import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newCash, clearErrors } from "../../actions/cashActions";
import { NEW_CASH_RESET } from "../../constants/cashConstants";

const NewCash = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state) => state.newCashEntry
  );
  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      navigate("/cash-list");
      message("Cash created successfully");
      dispatch({ type: NEW_CASH_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("description", description);
    formData.set("amount", amount);
    dispatch(newCash(formData));
  };

  return (
    <Fragment>
      <MetaData title={"New Cash"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form
                className="shadow-lg"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <h1 className="mb-4">New Cash</h1>

                <div className="form-group">
                  <label htmlFor="amount_field">Amount</label>
                  <input
                    type="number"
                    id="amount_field"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  CREATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default NewCash;
