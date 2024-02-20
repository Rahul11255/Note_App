import React from "react";
import "./landing.css";
import LoginForm from "../LoginForm";
import notes from "../../images/note.png";

const LandingPage = () => {
  return (
    <>
      <div className="container-fluid landing_cant">
        <div className="row">
          <h2 className="text-center heading_text mt-3">
            Note<span>Pad</span>
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
