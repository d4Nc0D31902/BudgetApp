import React, { Fragment, useState, useEffect } from "react";
import MetaData from "../layout/MetaData";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateCategory,
  getCategoryDetails,
  clearErrors,
} from "../../actions/categoryActions";
import { UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { Box, Typography, Grid, TextField, Button, Paper } from "@mui/material";

const UpdateCategory = () => {
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const { error, category } = useSelector((state) => state.categoryDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.category);
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
    if (category && category._id !== id) {
      dispatch(getCategoryDetails(id));
    } else {
      setDescription(category.description);
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
      navigate("/category-list");
      successMsg("Category updated successfully");
      dispatch({ type: UPDATE_CATEGORY_RESET });
    }
  }, [dispatch, error, isUpdated, navigate, updateError, category, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCategory(id, { description }));
  };

  return (
    <Fragment>
      <MetaData title={"Update Category"} />
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
              Update Category
            </Typography>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <TextField
                  id="description_field"
                  type="text"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                sx={{ mt: 3 }}
              >
                UPDATE
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default UpdateCategory;
