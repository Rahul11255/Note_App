const Note = require("../models/Note");
const { ObjectId } = require('mongodb');

const CreateNotes = async (req, res) => {
    try {
      const newNote = new Note({
       user_id: req.body.user_id,
        title: req.body.title,
        message: req.body.message,
      });
      const note = await newNote.save();
      res.status(200).json(note);
    } catch (error) {
      res.status(500).json(error);
    }
  };

const getUserNote = async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const data = await Note.find({ user_id:new ObjectId(user_id) });
      res.json(data);
    } catch (err) {
      next(err);
    }
};

const deletNotes = async (req, res, next) => {
  try {
    const result = await Note.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (err) {
    next(err);
  }
  
};

const getSingleNote = async (req, res, next) => {
  try {
    const  id = req.params.id;
    const data = await Note.findById(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};


const updateNote = async (req, res, next) => {
  try {
    const  id = req.params.id;
    const noteExist = await Note.findById(id);
    if(!noteExist){
      return res.status(401).json({msg:"note not found"});
    }
    const updateData = await Note.findByIdAndUpdate(id,req.body,{new:true});
    
    res.json(updateData);
  } catch (err) {
    next(err);
  }
};








module.exports = { CreateNotes,getUserNote,deletNotes,getSingleNote , updateNote };

  