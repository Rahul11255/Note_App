import React from "react";
import "./landing.css";
import notes from "../../images/note.png";
import LoginForm from "../LoginForm";

const LandingPage = () => {
  return (
    <>
      <div className="land_container">
        <div className="heading_top">
          <h2>
            Note<span>Pad</span>
          </h2>
          <h1>
            Forget about your messy <span>notes.</span>
          </h1>
        </div>
        <div className="lan_body">
          <div className="l_left">
            <LoginForm />
          </div>
          <div className="l_right">
            <img src={notes} alt="landing_image_notes" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
