import React, { Fragment, useState } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addAtmAmount, getAdminAtm } from "../../actions/atmActions";
import { ADD_ATM_RESET } from "../../constants/atmConstants";

const AddATMAmount = () => {
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();
  const { loading, error, atmEntry, income, success } = useSelector(
    (state) => state.atmAmount
  );
  const { id } = useParams();
  const navigate = useNavigate();

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const amountNumber = parseFloat(amount);
      await dispatch(addAtmAmount(id, amountNumber));
      navigate("/atm-list");
      dispatch(getAdminAtm());
      successMsg("Amount added successfully!");
    } catch (error) {
      console.error("Error adding amount:", error);
      errMsg("Failed to add the amount. Please try again.");
    }
  };

  return (
    <Fragment>
      <MetaData title={"Add ATM Amount"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <div className="wrapper my-5">
            <form className="shadow-lg" onSubmit={handleSubmit}>
              <h1 className="mb-4">Add Amount</h1>
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
                type="submit"
                className="btn btn-block py-3"
                disabled={loading}
              >
                {loading ? "Adding..." : "ADD"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddATMAmount;
