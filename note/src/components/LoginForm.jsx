import React, {  useState } from "react";
import "./landing/landing.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


const LoginForm = () => {
  // define login form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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


  const successMsg=()=>{
    toast.success('🦄 Login Successfull!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      theme: "colored",
      transition: "Bounce",
      });
  }

  const errorMsg=()=>{
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
  }

  // this function first check input is blank our note and after the full fill this condition data send to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
  
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
        const res = await axios.post("api/login", formData);
        const { _id, username } = res.data.data;
        localStorage.setItem("_id", _id);
        localStorage.setItem("username", username);
        localStorage.setItem("loggedIn", true);
        setFormData({});
        // alert("Data Submitted Successfully");
        successMsg()
        setTimeout(() => {
            navigate("/create-note");
          }, 1500);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // alert("An error occurred while logging in. Please try again later.");
          
        } else {
          errorMsg()
        }
      }
    }
  };
  

  // this help to navigate our page this methods come to react-router dom

  
  const navigate = useNavigate();

  // useEffect(() => {
  //   const loggedIn = JSON.parse(localStorage.getItem("loggedIn"));
  //   if (loggedIn) {
  //     navigate("/create-note");
  //   }
  // }, [navigate]);


  return (
    <>
    <form className="login_container" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <input
        type="email"
        name="email"
        placeholder="example@gmail.com"
        autoComplete="off"
        onChange={handleChange}
        className="mb-3"
      />
      {errors.email && <span className="error">{errors.email}</span>}
      <input
        type="password"
        name="password"
        placeholder="******"
        className="mb-3"
        onChange={handleChange}
      />
      {errors.password && <span className="error">{errors.password}</span>}
      <button type="submit" className="login_btn ">
        Login
      </button>
      <p className="p">or</p>
      <Link to={"/register"} className="create_now">
        Create now
      </Link>
    </form>
    <ToastContainer/>
    </>
  );
};

export default LoginForm;
