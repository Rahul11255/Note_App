const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerFormData = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginUserData = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json("wrong user Email-id");

    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(400).json("Wrong user login");
    console.log(req.body.password);

    const { password, ...others } = user._doc;
    res.status(200).json({ data: others });
  } catch (error) {
    res.status(500).json(error);
  }
};








module.exports = { registerFormData, loginUserData };
