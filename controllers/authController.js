const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Joi = require("joi");

const signupSchema = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

exports.signup = async (req, res) => {
  const { username, password } = req.body;

  const { error } = signupSchema.validate({ username, password });
  if(error) return res.status(400).json({ error: error.details[0].message });

  try {
    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginSchema = Joi.object({
    username: Joi.string().email().required(),
    password: Joi.string().min(6).required,
})

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const { error } = loginSchema.validate({ username, password });
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
