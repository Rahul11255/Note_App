import React, { useState } from "react";
import axios from "axios";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

const CreateNote = ({ getUsernotes, setShowMessage }) => {
  const [formData, setFormData] = useState({
    user_id: localStorage._id,
    title: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const saveNotes = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      alert("Please fill in all details.");
    } else {
      axios
        .post("https://keepnote-api.onrender.com/api/createnote", formData)
        .then((res) => {
          setFormData({
            user_id: localStorage._id,
            title: "",
            message: "",
          });
          getUsernotes();
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
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
              Happy message
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
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              <CancelPresentationIcon />
            </button>
            <button
              type="button"
              onClick={saveNotes}
              className="btn btn-success"
              data-bs-dismiss="modal"
            >
              <NoteAddIcon />
              Save notes
            </button>
          </div>
        </div>
      </div>
      {/* Display message */}
    </div>
  );
};

export default CreateNote;
