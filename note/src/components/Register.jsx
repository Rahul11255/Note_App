import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  // create usestate for register form to handle input
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // when input is blank then this state throw error
  const [errors, setErrors] = useState({});

  // handle our input with help of onchange method in input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  // this function first check input is blank our note and after the full fill this condition data send to backend
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
        await axios.post("http://127.0.0.1:5000/api/register", formData);
        setFormData({});
        alert("Data Submitted Successfully");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="register_container">
      <h1>Register</h1>
      <Link to={"/"} className="home">
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
  );
};

export default Register;
