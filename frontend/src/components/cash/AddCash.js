import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addCashAmount,
  getAdminCash,
  getCashDetails,
  clearErrors,
} from "../../actions/cashActions";
import { ADD_CASH_RESET } from "../../constants/cashConstants";
import { Box, Typography, Grid, TextField, Button, Paper } from "@mui/material";

const AddCash = () => {
  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();
  const { error, cashEntry } = useSelector((state) => state.cashEntryDetails);
  const {
    loading,
    error: addError,
    success,
  } = useSelector((state) => state.addAmount);
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

  useEffect(() => {
    if (error) {
      errMsg(error);
      dispatch(clearErrors());
    }

    if (addError) {
      errMsg(addError);
      dispatch(clearErrors());
    }

    if (success) {
      successMsg("Cash added successfully!");
      dispatch({ type: ADD_CASH_RESET });
      navigate("/cash-list");
    }
  }, [dispatch, error, addError, success, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      const amountNumber = parseFloat(amount);
      dispatch(addCashAmount(id, amountNumber));
    } catch (error) {
      console.error("Error adding cash:", error);
    }
  };

  return (
    <Fragment>
      <MetaData title={"Add Cash"} />
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
              Add Cash
            </Typography>
            <Box component="form" onSubmit={submitHandler}>
              <TextField
                label="Amount"
                type="number"
                fullWidth
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
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
                ADD
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default AddCash;
