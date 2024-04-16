const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 5000;
// help to send data in json formate in our database
// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// this cor help to send data our frontend to database
app.use(cors());

const DB = process.env.MONGO_DB_ONLINE_URL

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Databse is connected");
  })
  .catch((error) => {
    console.log(error);
  });

// mongodb://localhost:27017/KeeperApp

app.get("/", (req, res) => {
  res.json({ msg: "this is note keep app ruunning " });
});

// require our routes
const auth_route = require("./routes/auth");
const notes_route = require("./routes/notes");
// const { Db } = require("mongodb");

// middleware
app.use("/api", auth_route, notes_route);

// start aur backend
app.listen(PORT, () => {
  console.log(`Yes I am Connected Port no - ${PORT}😊👍`);
});
