import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Keep.css";
import axios from "axios";

const KeepNotes = () => {
  // this usestate handle our get note data
  const [note, setNote] = useState([]);

  // this usestaet handle form input data
  const [formData, setFormData] = useState({
    user_id: localStorage._id,
  });

  // this function perform onchange method
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  // this function logout our user
  const logout = () => {
    const logoutConfirmed = window.confirm("Are you sure you want to logout?");
    if (logoutConfirmed) {
      localStorage.clear();
      navigate("/");
    }
  };

  // this function help send data into backend
  const saveNotes = (e) => {
    e.preventDefault();

    if (formData.title == null || formData.message == null) {
      alert("kindly please fill-up all details ");
    } else {
      axios
        .post("http://127.0.0.1:5000/api/createnote", formData)
        .then((res) => {
          // getUserproperty()
          alert("Data Submitted Successfully");
          setFormData({});
          navigate("/create-note");
          window.location.reload();
          getUsernotes();

          // location.reload()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // its local id when user is login then  i am save this id on localstorage and use for call only his notes
  const ids = localStorage._id;

  useEffect(() => {
    getUsernotes();
  }, [ids]);

  // get the notes
  const getUsernotes = () => {
    axios
      .get(`http://127.0.0.1:5000/api/notes/${localStorage._id}`)
      .then((res) => {
        console.log(res.data);
        setNote(res.data);
      });
  };

  // this function help to delete note on database
  const delteNotes = async (path) => {
    try {
      axios.delete(`http://127.0.0.1:5000/api/note/${path}`).then((res) => {
        console.log(res);
        const deleteConfirmed = window.confirm(
          "Are you sure you want to Delete note?"
        );
        if (deleteConfirmed) {
          window.location.reload();
        }
        // navigate("/permission-module")
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <nav className="navbar bg-info-subtle">
        <div className="container-fluid">
          <h3 className="navbar-brand text-capitalize">
            Hello : {localStorage.username}
          </h3>
          <button type="button" className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>
      <div className="">
        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-outline-success align-items-center create_btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever="@getbootstrap"
          >
            Create-Notes
          </button>
        </div>

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
                    value={formData.title || ""}
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
                    value={formData.message || ""}
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
          {note
            .slice(0)
            .reverse()
            .map((list) => {
              return (
                <div key={list._id} className=" w-100 mb-4 notes_card">
                  <h3>{list.title}</h3>
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
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default KeepNotes;
