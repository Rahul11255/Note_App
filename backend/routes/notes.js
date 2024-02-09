const express = require('express')
const router = express.Router()
const {CreateNotes,getUserNote,deletNotes,getSingleNote,updateNote} = require("../controllers/CreateNote")

router.route("/createnote").post(CreateNotes);
router.route("/notes/:user_id").get(getUserNote)
router.route("/note/:id").delete(deletNotes)
router.route("/singleNote/:id").get(getSingleNote)
router.route("/update/:id").put(updateNote)


module.exports = router