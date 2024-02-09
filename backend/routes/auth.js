const express = require('express')
const router = express.Router()
const {registerFormData,loginUserData} = require("../controllers/auth")

router.route("/register").post(registerFormData)
router.route("/login").post(loginUserData)


module.exports = router