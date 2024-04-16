import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Keep.css";
import axios from "axios";
import Card from "./Card";
import CreateNote from "./CreateNote";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const KeepNotes = () => {
  const [note, setNote] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const logout = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const getUsernotes = async () => {
    try {
      const res = await axios.get(`https://keepnote-api.onrender.com/api/notes/${localStorage._id}`);
      setNote(res.data);
    } catch (error) {
      console.error("Error fetching user notes:", error);
    }
  };

  useEffect(() => {
    getUsernotes();
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <h3 className="navbar-brand text-capitalize" onClick={()=>{navigate('/')}}>
            <AccountCircleIcon  sx={{ fontSize: 30 }} style={{ cursor: "pointer" }} />: {localStorage.username}
          </h3>
          <button type="button" className="btn btn-danger" onClick={logout}>
            <LogoutIcon /> Logout
          </button>
        </div>
      </nav>

      <div
        className={`modal fade ${showLogoutModal ? "show" : ""}`}
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!showLogoutModal}
        style={{ display: showLogoutModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header log-md-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Logout
              </h5>
            </div>
            <div className="modal-body log-md-body">
              Are you sure you want to logout?
            </div>
            <div className="modal-footer log-md-header">
              <button type="button" className="btn btn-success" onClick={handleCloseLogoutModal}>
                No
              </button>
              <button type="button" className="btn btn-danger" onClick={handleLogout}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-3">
        <button
          type="button"
          className="btn btn-outline-success align-items-center text-center"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          data-bs-whatever="@getbootstrap"
        >
          <NoteAddIcon /> Create-Notes {note.length !== 0 ? note.length : ""}
        </button>
      </div>
      {showMessage && (
        <div className="toast-container position-fixed top-10 start-50 translate-middle">
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{ backgroundColor: "#03C03C" }}
          >
            <div className="toast-body text-center" style={{ color: "white" }}>
              Note created successfully! 🦄
            </div>
          </div>
        </div>
      )}

      <CreateNote getUsernotes={getUsernotes} setShowMessage={setShowMessage} />
      <Card note={note} getUsernotes={getUsernotes} />
    </>
  );
};

export default KeepNotes;
