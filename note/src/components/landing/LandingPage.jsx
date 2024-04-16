import React, { useEffect } from "react";
import "./landing.css";
import LoginForm from "../LoginForm";
import notes from "../../images/note.png";
import ContactMailIcon from '@mui/icons-material/ContactMail';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
      // User is logged in, navigate to the appropriate page
      navigate("/create-note");
    }
  }, [navigate]);

  const handleIconButtonClick = () => {
    navigate("/create-note");
  };

  return (
    <>
      <div className="container-fluid landing_cant">
        <div className="row">
          <h2 className="text-center heading_text mt-3">
            Note<span>Pad</span> 
            {localStorage.getItem("loggedIn") === "true" && (
              <IconButton onClick={handleIconButtonClick}>
                <ContactMailIcon sx={{fontSize:40 , color:"blue"}}/>
              </IconButton>
            )}
          </h2>
        </div>
        <div className="row">
          <h4 className="text-center heading_text2">
            Forget about your messy <span>notes.</span>
          </h4>
        </div>
        <div className=" heading_text3">
          <h4 className="text-center">
            "Create an account to manage all your daily activities."
          </h4>
        </div>
        <div className="container mt-3">
          <div className="row">
            <div className=" col-md p-3">
              <LoginForm />
            </div>
            <div className="col-md">
              <img
                className="img"
                src={notes}
                alt="landing-img"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
