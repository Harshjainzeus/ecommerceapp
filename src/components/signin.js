import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import{useAuth} from "../context/authcontext";
import {NavLink, Redirect} from 'react-router-dom';
import axios from "axios";

const LoginPage = () => {

  const auth = useAuth()
    
  return (
    auth.user? <Redirect to="/checkout" />:
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values) => {

        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/api/token/',
          data: {
            username: values.email,
            password: values.password
          }
        }).then(
          res => {
             console.log(res)
              if(res.status === 200)
              {
                auth.login(values)
                localStorage.setItem("user",values.email)
                
              }})     
     
     
      }}



      validationSchema={Yup.object().shape({
        email: Yup.string().email().required("required field"),
        password: Yup.string()
          .required("field cant be empty")
          .min(6, "enter password of atleast 6 length")
          .matches(/(?=.*[0-9])/, "enter atleast 1 number"),
      })}


    >
      {(props) => {
        const {
          values,
          touched,
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          isSubmitting,//what it does??
          isValid,
        } = props;
        //height is making scroll so how to cover height fully
        return (
          <div
            className="container bg-transparent d-flex "
            style={{ height: "90vh" }}
          >
            <div className=" w-25 card mx-auto my-auto ">
              
              <div className="card-header">

                
              </div>
              <div className="card-body">
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email"> Email </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${
                        errors.email && touched.email && "errors"
                      }`}
                      type="text"
                      name="email"
                      placeholder="Enter Email"
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email} </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password"> Password </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${
                        errors.password && touched.password && "errors"
                      }`}
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      value={values.password}
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password} </div>
                    )}
                  </div>
                  {/* button disabled not working */}
                  <button
                    type="submit"
                    className="btn btn-primary  w-100"
                    disabled={(!isValid || touched.email )&& isSubmitting}
                  >
                    Login
                  </button>
                  <NavLink to = "/signup"><button
                    className="btn btn-secondary mt-1  w-100"
                  >
                    Signup
                  </button>
                  </NavLink>
                </form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default LoginPage;