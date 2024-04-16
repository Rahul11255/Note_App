import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Keep.css";

const Update = () => {
  const { id } = useParams();
  const [note, setNote] = useState({ title: "", message: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({
      ...note,
      [name]: value,
    });
  };

  // get note data
  useEffect(() => {
    axios
      .get(`https://keepnote-api.onrender.com/api/singleNote/${id}`)
      .then((res) => {
        setNote(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const navigate = useNavigate();

  // update note function
  const updatNotes = (e) => {
    e.preventDefault();

    if (note.title == null || note.message == null) {
      alert("kindly please fill-up all details ");
    } else {
      axios
        .put(`https://keepnote-api.onrender.com/api/update/${id}`, note)
        .then((res) => {
          // getUserproperty()
          alert("Note UpDate Successfully");
          setNote({});
          navigate("/create-note");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="up_container d-flex  flex-column align-items-center ">
      <Link to={"/create-note"}>
        <button className="btn mt-4 btn-light">Back</button>
      </Link>
      <h3 h1 className="mt-3 update_text mb-4">
        Update your Notes
      </h3>
      <form className=" up_form">
        <div class="form-group mb-4 mt-3">
          <label for="exampleInputEmail1" style={{color:"white",letterSpacing:"1px"}}>Title</label>
          <input
            type="email"
            name="title"
            class="form-control"
            value={note.title}
            id="exampleInputEmail1"
            onChange={handleChange}
            aria-describedby="emailHelp"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1"  style={{color:"white",letterSpacing:"1px"}}>Password</label>
          <textarea
            type="password"
            name="message"
            value={note.message}
            class="form-control"
            onChange={handleChange}
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" onClick={updatNotes} style={{backgroundColor:"#32CD32",color:"white"}} class="btn   mt-4">
          Update note
        </button>
      </form>
    </div>
  );
};

export default Update;
