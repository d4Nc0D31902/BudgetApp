import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateExpenses,
  getExpensesDetails,
  clearErrors,
} from "../../actions/expensesActions";
import { UPDATE_EXPENSES_RESET } from "../../constants/expensesConstants";

const UpdateExpenses = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();
  const { error, expensesEntry } = useSelector(
    (state) => state.expensesEntryDetails
  );
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.expenses);
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
    if (expensesEntry && expensesEntry._id !== id) {
      dispatch(getExpensesDetails(id));
    } else {
      setDescription(expensesEntry.description);
      setAmount(expensesEntry.amount);
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
      navigate("/expenses-list");
      successMsg("Expenses updated successfully");
      dispatch({ type: UPDATE_EXPENSES_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, expensesEntry, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateExpenses(id, { description, amount }));
  };

  return (
    <Fragment>
      <MetaData title={"Update Expenses"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">Update Expenses</h1>
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

export default UpdateExpenses;
