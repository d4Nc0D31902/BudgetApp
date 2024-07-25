import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { newBudget, clearErrors } from "../../actions/budgetActions";
import { NEW_BUDGET_RESET } from "../../constants/budgetConstants";

const NewBudget = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state) => state.newBudget
  );

  useEffect(() => {
    const message = (message = "") =>
      toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });

    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      navigate("/budget-list");
      message("Budget created successfully");
      dispatch({ type: NEW_BUDGET_RESET });
    }
  }, [dispatch, error, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(newBudget({ description, amount }));
  };

  return (
    <Fragment>
      <MetaData title={"New Budget"} />
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
                <h1 className="mb-4">New Budget</h1>

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

export default NewBudget;
