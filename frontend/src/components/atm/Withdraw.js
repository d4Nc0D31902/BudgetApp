import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  withdrawMoney,
  clearErrors,
  getAdminAtm,
} from "../../actions/atmActions";
import { WITHDRAW_ATM_RESET } from "../../constants/atmConstants";
import { Box, Grid, TextField, Typography, Button, Paper } from "@mui/material";

const WithdrawForm = () => {
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const { loading, error, success } = useSelector(
    (state) => state.withdrawMoney
  );
  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (amount > 0) {
      try {
        await dispatch(withdrawMoney(amount));
        navigate("/atm-list");
        dispatch(getAdminAtm());
        message("Withdrawal successful");
      } catch (error) {
        toast.error("Failed to withdraw money. Please try again.");
      }
    } else {
      toast.error("Enter a valid amount");
    }
  };

  return (
    <Fragment>
      <MetaData title={"Withdraw Money"} />
      <Grid container>
        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={10}>
          <Box
            component={Paper}
            elevation={3}
            sx={{
              mt: 5,
              p: 4,
              borderRadius: "16px",
              mx: 2,
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Withdraw
            </Typography>
            <Box component="form" onSubmit={submitHandler}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                variant="outlined"
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mt: 3 }}
              >
                Withdraw
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default WithdrawForm;

{
  /* <div className="row">
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
                <h1 className="mb-4">Withdraw Money</h1>
                <div className="form-group">
                  <label htmlFor="amount_field">Amount</label>
                  <input
                    type="number"
                    id="amount_field"
                    className="form-control"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>

                <button
                  id="withdraw_button"
                  type="submit"
                  className="btn btn-block py-3"
                  disabled={loading ? true : false}
                >
                  WITHDRAW
                </button>
              </form>
            </div>
          </Fragment>
        </div>
      </div> */
}
