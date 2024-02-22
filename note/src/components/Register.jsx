import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // user login msg
  const successMsg=()=>{
    toast.success(' Your account has been successfully created.', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "colored",
      transition: "Bounce",
      });
  }
// tostify user is already exist msg
  const errorMsg=()=>{
    toast.error('🦄 User already exists!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: "Zoom",
      });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = {};
    let isFormValid = true;
  
    if (!formData.username.trim()) {
      validationErrors.username = "Username is required";
      isFormValid = false;
    }
  
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
      isFormValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
      isFormValid = false;
    }
  
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
      isFormValid = false;
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password should be at least 6 characters";
      isFormValid = false;
    }
  
    setErrors(validationErrors);
  
    if (isFormValid) {
      try {
        const response = await axios.post("/api/register", formData);
        if (response.data.error) {
          errorMsg() // Display the error message from the backend

        } else {
          setFormData({});
          // alert("Data Submitted Successfully");
          successMsg()
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        errorMsg(); // Display the error message from the backend
          // console.log(error)
      }
    }
  };
  

  return (
    <>
    <div className="register_container">
      <h1>Register</h1>
      <Link to={"/"} className="home  text-center">
        Home
      </Link>
      <form onSubmit={handleSubmit} className="register_form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            autoComplete="off"
            className="mb-3"
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            autoComplete="off"
            onChange={handleChange}
            className="mb-3"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="******"
            onChange={handleChange}
            className="mb-3"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit" className="register_btn">
          Register
        </button>
      </form>
    </div>
    <ToastContainer/>

    </>
  );
};

export default Register;
