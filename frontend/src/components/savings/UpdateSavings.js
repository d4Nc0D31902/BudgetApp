import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateSavings,
  getSavingsDetails,
  clearErrors,
} from "../../actions/savingsActions";
import { UPDATE_SAVINGS_RESET } from "../../constants/savingsConstants";

const UpdateSavings = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();
  const { error, savingsEntry } = useSelector(
    (state) => state.savingsEntryDetails
  );
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.savings);
  let { id } = useParams();
  let navigate = useNavigate();
  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  useEffect(() => {
    if (savingsEntry && savingsEntry._id !== id) {
      dispatch(getSavingsDetails(id));
    } else {
      setDescription(savingsEntry.description);
      setAmount(savingsEntry.amount);
    }
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      errMsg(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      navigate("/savings-list");
      successMsg("Savings updated successfully");
      dispatch({ type: UPDATE_SAVINGS_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, savingsEntry, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateSavings(id, { description, amount }));
  };

  return (
    <Fragment>
      <MetaData title={"Update Savings"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">Update Savings</h1>
                <div className="form-group">
                  <label htmlFor="description_field">Description</label>
                  <input
                    type="text"
                    id="description_field"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

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
                  UPDATE
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateSavings;
