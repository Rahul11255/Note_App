const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerFormData = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Omit the password from the response
    // const { password: _, ...user } = savedUser._doc;

    // Return the user data without the password
    res.status(200).json(savedUser);
  } catch (error) {
    console.error("Error occurred while registering:", error);
    res.status(500).json({ error: "An error occurred while registering" });
  }
};



const loginUserData = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const { password, ...others } = user._doc;
    res.status(200).json({ data: others });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while logging in" });
  }
};









module.exports = { registerFormData, loginUserData };
