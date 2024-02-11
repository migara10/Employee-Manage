import React from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./login.scss";

function LoginComponent() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  // validation
  const validationSchema = Yup.object({
    userName: Yup.string().required('Required!'),
    password: Yup.string()
        .required("Required!")
        .min(8, "Password must be at least 8 characters")
  })

  // use formik
  const formik = useFormik({
    initialValues: {
      userName: "migaraten",
      password: "J@va1234",
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      loginUser(values)
    },
  });
  
  const loginUser = async (user) =>{
    await axios.post("http://localhost:4100/api/login", user).then(res => {
      const { token, message, user } = res.data;
      localStorage.setItem("authToken", token);
      toast.success(message);
      setTimeout(() =>{
        navigate('/dashboard', { state: { user } });
      },1300)
    }).catch(error => {
      toast.error(error.response.data.error);
    });
  }
  return (
    <div className="login-page">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="admin-banner">
        <h1 className="text-center w-100">
          Employee Manage <br /> System
        </h1>
      </div>
      <div className="login-form">
        <div className="block">
          <h2>Login Page</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* user name */}
            <div>
              <label htmlFor="username">
                <strong>User Name:</strong>
              </label>
              <input
                {...formik.getFieldProps("userName")}
                type="text"
                name="userName"
                autoComplete="off"
                placeholder="Enter Username"
                className="form-control rounded-0"
              />
              {formik.touched.userName && formik.errors.userName ? 
                <div className="error">{formik.errors.userName}</div> : null
              }
            </div>
            {/* password */}
            <div>
              <label htmlFor="email">
                <strong>Password:</strong>
              </label>
              <input
                {...formik.getFieldProps("password")}
                type="password"
                name="password"
                autoComplete="off"
                placeholder="Enter Password"
                className="form-control rounded-0"
              />
              {formik.touched.password && formik.errors.password ? 
                <div className="error">{formik.errors.password}</div> : null
              }
            </div>
            <button type="submit" className="btn btn-success rounded-0 mt-3">Login</button>
          </form>
          <p className="mt-3 sign-in">DON'T HAVE AN ACCOUNT ? <Link className="link-path"  to="/register">SIGN UP.</Link></p>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
