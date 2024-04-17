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
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // State for loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Success message
  const successMsg = () => {
    toast.success('Your account has been successfully created.', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "colored",
      transition: "Bounce",
    });
  };

  // Error message for existing user
  const userExistsMsg = () => {
    toast.error('User already exists!', {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true when form is submitted

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
        const response = await axios.post("https://keepnote-api.onrender.com/api/register", formData);
        if (response.data.error) {
          userExistsMsg(); // Display the error message from the backend
        } else {
          successMsg();
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      } catch (error) {
        userExistsMsg(); // Display the error message from the backend
        // console.log(error)
      } finally {
        setIsLoading(false); // Set loading state to false after request completes
      }
    } else {
      setIsLoading(false); // Set loading state to false if form is not valid
    }
  };

  return (
    <>
      <div className="register_container">
        <h1>Register</h1>
        <Link to={"/"} className="home text-center">
          Home
        </Link>
        <form onSubmit={handleSubmit} className="register_form">
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              className="mb-3"
              value={formData.username}
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
              className="mb-3"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="******"
              className="mb-3"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <button type="submit" className="register_btn" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Register'} {/* Display loading text if isLoading is true */}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
