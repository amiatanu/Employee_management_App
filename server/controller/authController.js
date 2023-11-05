const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// register controller
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, location, role } = req.body;

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ Email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new User({
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Location: location,
      Password: hashedPassword,
      Role: role,
    });

    // Save the user
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

const loginUser = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ Email: email });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "15d",
      });

      res.status(200).json({
        message: "Login successful",
        token: token,
        user,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req?.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserInfo };
