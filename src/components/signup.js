import React,{useState} from "react";
import { Formik } from "formik";
import * as Yup from "yup";
// import {Redirect} from 'react-router-dom';
import axios from "axios";
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core'


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const SignupPage = () => {

  const [open, setOpen] = React.useState(false);
  const [response, setresponse] = useState({
      status : "success",
      Text : ''
  })


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
    
  return (
    // auth.user? <Redirect to="/checkout" />:
    <Formik
      initialValues={{ email: "", password: "" ,username: "",first_name: "",last_name: ""}}
      onSubmit={(values) => {

        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/api/signup/',
          data: {
            username: values.email,
            password: values.password,
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.username,
          }
        }).then(
          res => {
             console.log(res)
             if(res.status === 201)
             {
                 console.log("success")
                 setOpen(true)
                 setresponse({
                     status:"success",
                     Text:"Register Successfull please Login"
                 })
                 
             }else{
                setOpen(true)
                setresponse({
                    status:"error",
                    Text:res.data
                })}
            
            })     
     
     
      }}



      validationSchema={Yup.object().shape({
        email: Yup.string().email().required("required field"),
        password: Yup.string()
          .required("field cant be empty")
          .min(6, "enter password of atleast 6 length")
          .matches(/(?=.*[0-9])/, "enter atleast 1 number"),
        first_name: Yup.string().min(1,"enter minimum 1 char"),
        last_name: Yup.string().min(1,"enter minimum 1 char"),
        username:Yup.string().min(2,"enter minimum 2 chars")

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
                    <label htmlFor="first_name"> first name </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${
                        errors.first_name && touched.first_name && "errors"
                      }`}
                      type="text"
                      name="first_name"
                      placeholder="Enter First_name"
                      value={values.first_name}
                    />
                    {errors.first_name && touched.first_name && (
                      <div className="input-feedback">{errors.first_name} </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name"> Last Name </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${
                        errors.last_name && touched.last_name && "errors"
                      }`}
                      type="text"
                      name="last_name"
                      placeholder="Enter last_name"
                      value={values.last_name}
                    />
                    {errors.last_name && touched.last_name && (
                      <div className="input-feedback">{errors.last_name} </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="username"> Username </label>
                    <input
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`form-control ${
                        errors.username && touched.username && "errors"
                      }`}
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={values.username}
                    />
                    {errors.username && touched.username && (
                      <div className="input-feedback">{errors.username} </div>
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
                    Signup
                  </button>
                </form>
              </div>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={response.status}>
            {response.Text}
        </Alert>
      </Snackbar>
          </div>
        );
      }}
    </Formik>
  );
};

export default SignupPage;