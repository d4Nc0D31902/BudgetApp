import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  processTransaction,
  clearErrors,
  getAllTransactions,
} from "../../actions/transactionActions";
import { getAdminCategory } from "../../actions/categoryActions";
import { PROCESS_TRANSACTION_RESET } from "../../constants/transactionConstants";
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextareaAutosize,
  Paper,
} from "@mui/material";

const NewTransaction = () => {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState("");
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, success } = useSelector(
    (state) => state.processTransaction
  );

  useEffect(() => {
    console.log("Fetching admin categories...");
    dispatch(getAdminCategory());
  }, [dispatch]);

  const errMsg = (message = "") =>
    toast.error(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const successMsg = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const message = (message = "") =>
    toast.success(message, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const transactionData = {
        account,
        amount,
        category,
        notes,
        date,
      };
      await dispatch(processTransaction(transactionData));
      navigate("/transaction-list");
      dispatch(getAllTransactions());
      successMsg("Transaction Success!");
    } catch (error) {
      errMsg("Error Deleting Transaction!");
    }
  };

  const accountOptions = [
    { value: "", label: "Select Account" },
    { value: "On Hand", label: "Cash" },
    { value: "ATM", label: "ATM" },
  ];

  const categoryOptions = [
    { value: "", label: "Select Category" },
    { value: "Expenses", label: "Expenses" },
    { value: "Savings", label: "Savings" },
  ];

  return (
    <Fragment>
      <MetaData title={"New Transaction"} />
      <Grid container spacing={2}>
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
              New Transaction
            </Typography>
            <form onSubmit={submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="account_field">Account</InputLabel>
                    <Select
                      value={account}
                      onChange={(e) => setAccount(e.target.value)}
                      label="Account"
                      required
                      fullWidth
                    >
                      {accountOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="amount_field"
                    label="Amount"
                    type="number"
                    fullWidth
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="category_field">Category</InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Category"
                      required
                      fullWidth
                    >
                      {categoryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    {category === "Expenses" ? (
                      <Select
                        required
                        labelId="notes-label"
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        fullWidth
                      >
                        <MenuItem value="">Select an Expense</MenuItem>{" "}
                        {categories.map((category) => (
                          <MenuItem
                            key={category._id}
                            value={category.description}
                          >
                            {category.description}
                          </MenuItem>
                        ))}
                      </Select>
                    ) : (
                      <TextField
                        id="notes_field"
                        required
                        multiline
                        rows={4}
                        placeholder="Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        style={{ width: "100%", resize: "vertical" }}
                      />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 3 }}
                  >
                    Transact
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default NewTransaction;
