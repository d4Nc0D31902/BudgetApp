import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import Sidebar from "../admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdminBudget,
  deleteBudget,
  clearErrors,
} from "../../actions/budgetActions";
import { DELETE_BUDGET_RESET } from "../../constants/budgetConstants";

const BudgetList = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { loading, error, budgets } = useSelector((state) => state.budgets);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.budget
  );

  useEffect(() => {
    dispatch(getAdminBudget());
    if (error) {
      dispatch(clearErrors());
    }
    if (deleteError) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      navigate("/budget-list");
      dispatch({ type: DELETE_BUDGET_RESET });
    }
  }, [dispatch, error, navigate, isDeleted, deleteError]);

  const setBudget = () => {
    const data = {
      columns: [
        {
          label: "Description",
          field: "description",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };

    if (budgets) {
      budgets.forEach((budget) => {
        data.rows.push({
          id: budget._id,
          description: budget.description,
          // amount: `₱${budget.amount
          //   .toFixed(2)
          //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
          amount: `₱${parseFloat(budget.amount).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`,
          actions: (
            <Fragment>
              <Link
                to={`/budget/${budget._id}/update`}
                className="btn btn-primary py-1 px-2"
              >
                <i className="fa fa-pencil"></i>
              </Link>
              <button
                className="btn btn-danger py-1 px-2 ml-2"
                onClick={() => deleteBudgetHandler(budget._id)}
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

  const deleteBudgetHandler = (id) => {
    dispatch(deleteBudget(id));
  };

  return (
    <Fragment>
      <MetaData title={"Budget List"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <Fragment>
            <h1 className="my-5">Budget List</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setBudget()}
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

export default BudgetList;
