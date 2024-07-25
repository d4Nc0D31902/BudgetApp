import React, { Fragment, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import Sidebar from "../admin/Sidebar";

import { useDispatch, useSelector } from "react-redux";

import {
  getAdminCategory,
  deleteCategory,
  clearErrors,
} from "../../actions/categoryActions";

import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";

const CategoryList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, categories } = useSelector(
    (state) => state.categories
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(getAdminCategory());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      navigate("/category-list");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  const setCategories = () => {
    const data = {
      columns: [
        {
          label: "Description",
          field: "description",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    if (categories) {
      categories.forEach((category) => {
        data.rows.push({
          id: category._id,
          description: category.description,
          actions: (
            <Fragment>
              <Link
                to={`/category/${category._id}/update`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteCategoryHandler(category._id)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </Fragment>
          ),
        });
      });
    }

    return data;
  };

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Categories"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">All Categories</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setCategories()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
};

export default CategoryList;
