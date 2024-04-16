import axios from "axios";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import question from "../../images/question.png";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const Card = ({ note, getUsernotes }) => {
  const delteNotes = async (path) => {
    try {
      const deleteConfirmed = window.confirm(
        "Are you sure you want to Delete note?"
      );
      if (deleteConfirmed) {
        await axios.delete(`https://keepnote-api.onrender.com/api/note/${path}`);
        getUsernotes(); // Refresh notes after deletion
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getColor = (index) => {
    const colors = [
      "#F0F8FF",
      "#FAEBD7",
      "#00FFFF",
      "#7FFFD4",
      "#F0FFFF",
      "#F5F5DC",
      "#FFE4C4",
     
      "#FFEBCD",
      "#DEB887",
      "#5F9EA0",
      "#7FFF00",
      "#D2691E",
      "#FF7F50",
      "#6495ED",
      "#FFF8DC",
      "#DC143C",
      "#00FFFF",
      "#008B8B",
      "#B8860B",
      "#A9A9A9",
      "#006400",
      "#BDB76B",
      "#8B008B",
      "#556B2F",
      "#FF8C00",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="container mt-4">
      <div className="row note_list">
        {note.length === 0 ? (
          <img
            loading="lazy"
            src={question}
            className="img-fluid rounded mx-auto d-block"
            alt="question"
            style={{
              width: "100%",
              height: "75vh",
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        ) : (
          note
            .slice(0)
            .reverse()
            .map((list, index) => (
              <div
                key={list._id}
                className="w-100 mb-4 notes_card"
                style={{
                  backgroundColor: getColor(index),
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <div className="row">
                  <h3 className="col-10">{list.title} </h3>
                  <p className="col-md-2" style={{ color: "grey",fontSize:"12px",fontWeight:400 }}>
                  <AccessTimeFilledIcon sx={{fontSize:18}}/>  {moment(list.updatedAt).format("MMMM Do YYYY")}
                  </p>
                </div>
                <p>
                  <span>message : </span> {list.message}
                </p>
                <Link to={`/update/` + list._id} className="m-2">
                  <button className="btn " style={{backgroundColor:"#1CAC78"}}>
                  <EditNoteIcon  sx={{ color: "white"}} />
                  </button>
                </Link>
                <button
                  className="btn"
                  style={{backgroundColor:"#e41c38"}}
                  onClick={() => delteNotes(list._id)}
                >
                  <DeleteForeverIcon  sx={{ color: "white"}} />
                </button>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Card;
