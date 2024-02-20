import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Keep.css";
import axios from "axios";
import moment from "moment";
import question from '../../images/question.png'

const KeepNotes = () => {
  const [note, setNote] = useState([]);
  const [formData, setFormData] = useState({
    user_id: localStorage._id,
    title: "",
    message: "",
  });
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const logout = () => {
    setShowLogoutModal(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const saveNotes = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      alert("Please fill in all details.");
    } else {
      axios
        .post("api/createnote", formData)
        .then((res) => {
          alert("Data Submitted Successfully");
          setFormData({
            user_id: localStorage._id,
            title: "",
            message: "",
          });
          getUsernotes();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getUsernotes();
  }, []);

  const getUsernotes = () => {
    axios.get(`api/notes/${localStorage._id}`).then((res) => {
      setNote(res.data);
    });
  };

  const delteNotes = async (path) => {
    try {
      const deleteConfirmed = window.confirm(
        "Are you sure you want to Delete note?"
      );
      if (deleteConfirmed) {
        await axios.delete(`api/note/${path}`);
        getUsernotes(); // Refresh notes after deletion
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getColor = (index) => {
    const colors = [
      "#F0F8FF", "#FAEBD7", "#00FFFF", "#7FFFD4", "#F0FFFF",
      "#F5F5DC", "#FFE4C4", "#000000", "#FFEBCD", "#0000FF",
      "#8A2BE2", "#A52A2A", "#DEB887", "#5F9EA0", "#7FFF00",
      "#D2691E", "#FF7F50", "#6495ED", "#FFF8DC", "#DC143C",
      "#00FFFF", "#00008B", "#008B8B", "#B8860B", "#A9A9A9",
      "#006400", "#BDB76B", "#8B008B", "#556B2F", "#FF8C00"
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      <nav className="navbar ">
        <div className="container-fluid">
          <h3 className="navbar-brand text-capitalize">
            Hello : {localStorage.username}
          </h3>
          <button type="button" className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      {/* Logout Modal POP-UP */}
      <div
        className={`modal fade ${showLogoutModal ? "show" : ""}`}
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!showLogoutModal}
        style={{ display: showLogoutModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered   ">
          <div className="modal-content ">
            <div className="modal-header log-md-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Logout
              </h5>
            </div>
            <div className="modal-body log-md-body">Are you sure you want to logout?</div>
            <div className="modal-footer log-md-header">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleCloseLogoutModal}
              >
                No
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-outline-success align-items-center create_btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@getbootstrap"
          >
            Create-Notes {note.length !== 0 ? note.length : ""}
          </button>
        </div>

        {/* Create Notes Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  New message
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title:
                  </label>
                  <input
                    value={formData.title}
                    type="text"
                    name="title"
                    className="form-control"
                    id="recipient-name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Message:
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                    id="message-text"
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={saveNotes}
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save notes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="row note_list">
          {note.length === 0 ? (
            <img loading="lazy" src={question} className="img-fluid rounded mx-auto d-block" alt="question" style={{ width: "100%",height:"75vh",objectFit:"contain" }} />

          ) : (
            note.slice(0).reverse().map((list, index) => (
              <div key={list._id} className="w-100 mb-4 notes_card" style={{ backgroundColor: getColor(index), padding: '10px', borderRadius: '5px' }}>
                <div className="row">
                  <h3 className="col-10">{list.title}  </h3>
                  <p className="col-md-2" style={{ color: "grey" }}> {moment(list.updatedAt).format('MMMM Do YYYY')} </p>
                </div>
                <p>
                  <span>message : </span> {list.message}
                </p>
                <Link to={`/update/` + list._id} className="m-2">
                  <button className="btn btn-success">Edit</button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => delteNotes(list._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default KeepNotes;
