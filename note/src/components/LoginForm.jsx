import React, { useState } from "react";
import "./landing/landing.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const successMsg = () => {
    toast.success('🦄 Login Successfull!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "colored",
      transition: "Bounce",
    });
  };

  const errorMsg = () => {
    toast.error('Invalid email or password. Please try again later.', {
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
    setIsLoading(true); // Set loading state to true when the form is submitted

    const validationErrors = {};
    let isFormValid = true;

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
        const res = await axios.post("https://keepnote-api.onrender.com/api/login", formData);
        const { _id, username } = res.data.data;
        localStorage.setItem("_id", _id);
        localStorage.setItem("username", username);
        localStorage.setItem("loggedIn", true);
        setFormData({
          email: "",
          password: ""
        });
        successMsg();
        setTimeout(() => {
          navigate("/create-note");
        }, 1500);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access error
          errorMsg();
        } else {
          // Handle other errors
          errorMsg();
        }
      } finally {
        setIsLoading(false); // Set loading state to false when request completes
      }
    } else {
      setIsLoading(false); // Set loading state to false if the form is not valid
    }
  };

  return (
    <>
      <form className="login_container" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          onChange={handleChange}
          className="mb-3"
          value={formData.email}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <input
          type="password"
          name="password"
          placeholder="******"
          className="mb-3"
          onChange={handleChange}
          value={formData.password}
        />
        {errors.password && <span className="error">{errors.password}</span>}
        <button type="submit" className="login_btn" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'} {/* Display loading text if isLoading is true */}
        </button>
        <p className="p">or</p>
        <Link to={"/register"} className="create_now">
          Create now
        </Link>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
