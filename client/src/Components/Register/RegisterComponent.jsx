import React from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./register.scss";

function RegisterComponent() {
  const navigate = useNavigate();
  
  // validation
  const validationSchema = Yup.object({
    userName: Yup.string().required('Required!'),
    email: Yup.string().required('Required!').email("Invalid email format!"),
    password: Yup.string()
        .required("Required!")
        .min(8, "Password must be at least 8 characters")
  })

  // use formik
  const formik = useFormik({
    initialValues: {
      firstName: "migara",
      userName: "migara10",
      email: "migara@gmail.com",
      password: "J@va1234",
      role: "user",
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      registerUser(values)
    },
  });
  
  const registerUser = async (user) =>{
    await axios.post("http://localhost:4100/api/register", user).then(res => {
      console.log(res)
      toast.success(res.data.message);
      setTimeout(() =>{
        navigate("/login");
      },2000)
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
          <h2>Register Page</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* firstName */}
            <div>
              <label htmlFor="email">
                <strong>First Name:</strong>
              </label>
              <input
                {...formik.getFieldProps("firstName")}
                type="text"
                name="firstName"
                autoComplete="off"
                placeholder="Enter First Name"
                className="form-control rounded-0"
              />
            </div>
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

            {/* email */}
            <div>
              <label htmlFor="email">
                <strong>Email:</strong>
              </label>
              <input
                {...formik.getFieldProps("email")}
                type="emil"
                name="email"
                autoComplete="off"
                placeholder="Enter Email"
                className="form-control rounded-0"
              />
              {formik.touched.email && formik.errors.email ? 
                <div className="error">{formik.errors.email}</div> : null
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
            {/* select role */}
            <div>
              <label htmlFor="role">
                <strong>Select Role:</strong>
              </label>
              <select
                {...formik.getFieldProps("role")}
                name="role"
                className="form-control rounded-0"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success rounded-0 mt-3">
              Register
            </button>
          </form>
          <p className="mt-3 sign-in">ALREADY HAVE AN ACCOUNT ? <Link className="link-path"  to="/login">SIGN IN.</Link></p>
        </div>
      </div>
    </div>
  );
}

export default RegisterComponent;
