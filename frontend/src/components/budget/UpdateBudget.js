import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateBudget,
  getBudgetDetails,
  clearErrors,
} from "../../actions/budgetActions";
import { UPDATE_BUDGET_RESET } from "../../constants/budgetConstants";

const UpdateBudget = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();
  const { error, budget } = useSelector(
    (state) => state.budgetDetails
  );
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.budget);
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
    if (budget && budget._id !== id) {
      dispatch(getBudgetDetails(id));
    } else {
      setDescription(budget.description);
      setAmount(budget.amount);
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
      navigate("/budget-list");
      successMsg("Budget updated successfully");
      dispatch({ type: UPDATE_BUDGET_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, budget, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateBudget(id, { description, amount }));
  };

  return (
    <Fragment>
      <MetaData title={"Update Budget"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <div className="wrapper my-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-4">Update Budget</h1>
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

export default UpdateBudget;
