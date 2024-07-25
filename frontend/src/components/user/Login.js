import React, { useState, useEffect, Fragment } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, clearErrors } from "../../actions/userActions";

import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Divider,
  Stack,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  const redirect = new URLSearchParams(location.search).get("redirect");

  const notify = (error = "") =>
    toast.error(error, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

  useEffect(() => {
    if (isAuthenticated && redirect === "shipping") {
      navigate(`/${redirect}`, { replace: true });
    } else if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      notify(error);
      dispatch(clearErrors());
    }
  }, [dispatch, isAuthenticated, error, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Login"} />
          <Container maxWidth="sm" sx={{ height: "100vh" }}>
            <Box
              component="form"
              onSubmit={submitHandler}
              sx={{
                boxShadow: 3,
                p: 4,
                borderRadius: "20px",
                backgroundColor: "#fff",
                mt: 3,
              }}
            >
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                textAlign={"center"}
              >
                Login
              </Typography>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email_field"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password_field"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Link
                component={RouterLink}
                to="/password/forgot"
                sx={{
                  display: "block",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                Forgot Password?
              </Link>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Login
              </Button>

              <Box
                sx={{ display: "flex", mt: 2, justifyContent: "center", mb: 2 }}
              >
                <Typography>Don't have an account?</Typography>
                <Link
                  component={RouterLink}
                  to="/register"
                  sx={{ ml: "2px", textDecoration: "none" }}
                >
                  Signup
                </Link>
              </Box>
              <Divider sx={{ mb: "5px" }}>Or</Divider>

              <Stack gap={2}>
                <Button
                  variant="contained"
                  startIcon={<GoogleIcon />}
                  sx={{
                    margin: "2px",
                    backgroundColor: "white",
                    color: "black",
                  }}
                >
                  Sign In with Google
                </Button>
                <Button
                  variant="contained"
                  startIcon={<FacebookIcon />}
                  sx={{ margin: "2px" }}
                >
                  Sign In with Facebook
                </Button>
              </Stack>
            </Box>
          </Container>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;

// import React, { Fragment, useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// import Loader from "../layout/Loader";
// import MetaData from "../layout/MetaData";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import { useDispatch, useSelector } from "react-redux";
// import { login, clearErrors } from "../../actions/userActions";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   let location = useLocation();
//   const { isAuthenticated, error, loading } = useSelector(
//     (state) => state.auth
//   );
//   // const redirect = location.search ? location.search.split('=')[1] : ''
//   const redirect = new URLSearchParams(location.search).get("redirect");
//   const notify = (error = "") =>
//     toast.error(error, {
//       position: toast.POSITION.BOTTOM_CENTER,
//     });
//   useEffect(() => {
//     if (isAuthenticated && redirect === "shipping") {
//       navigate(`/${redirect}`, { replace: true });
//     } else if (isAuthenticated) navigate("/");
//     if (error) {
//       // alert.error(error);
//       console.log(error);
//       notify(error);
//       dispatch(clearErrors());
//     }
//   }, [dispatch, isAuthenticated, error, navigate, redirect]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(login(email, password));
//   };

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title={"Login"} />

//           <div className="row wrapper">
//             <div className="col-10 col-lg-5">
//               <form className="shadow-lg" onSubmit={submitHandler}>
//                 <h1 className="mb-3">Login</h1>
//                 <div className="form-group">
//                   <label htmlFor="email_field">Email</label>
//                   <input
//                     type="email"
//                     id="email_field"
//                     className="form-control"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password_field">Password</label>
//                   <input
//                     type="password"
//                     id="password_field"
//                     className="form-control"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>

//                 <Link to="/password/forgot" className="float-right mb-4">
//                   Forgot Password?
//                 </Link>

//                 <button
//                   id="login_button"
//                   type="submit"
//                   className="btn btn-block py-3"
//                 >
//                   LOGIN
//                 </button>

//                 <Link to="/register" className="float-right mt-3">
//                   New User?
//                 </Link>
//               </form>
//             </div>
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default Login;
