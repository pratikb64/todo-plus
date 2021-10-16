const express = require("express");
const router = express.Router();
const { createHmac } = require("crypto");
const secret = process.env.PASSWORD_SECRET;
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const { v4: uuidv4 } = require("uuid");
const { ObjectId } = require("mongodb");

function isValidPassword(password) {
  if (password.length >= 8) {
    return true;
  }
  return false;
}

function isValidEmail(email) {
  var re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email))
    return res.status(406).json({ message: "Enter valid email address" });

  const user = await User.findOne({ email });

  if (!user)
    return res
      .status(404)
      .json({ message: "User not found check your email address!" });

  const hash = createHmac("sha256", secret).update(password).digest("hex");

  if (user.password !== hash)
    return res.status(400).json({ message: "Incorrect email or password!" });

  const sevenDaysToSeconds = 24 * 60 * 60 * 7 * 1000;
  const token = jwt.sign(
    {
      user_id: user._id,
      email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return res
    .cookie("session-token", token, {
      maxAge: sevenDaysToSeconds,
      httpOnly: true,
      /* ,
		secure: process.env.NODE_ENV === 'production' ? true : false */
    })
    .json({ message: "Logged in successfully!" });
});

router.post("/register", async (req, res) => {
  const { email, password, first_name, last_name } = req.body;

  if (!isValidEmail(email) || !isValidPassword(password))
    return res.status(406).json({ message: "Invalid email or password!" });

  const email_exists = await User.findOne({ email });
  if (email_exists)
    return res.status(409).json({ message: "Email already exists!" });

  const hash = createHmac("sha256", secret).update(password).digest("hex");

  User.create({
    email: email.toLowerCase(),
    password: hash,
    first_name,
    last_name,
  })
    .then(() => res.json({ message: "Account created successfully!" }))
    .catch((er) => {
      return res.status(500).json({ message: "Server error try again later!" });
    });
});

router.use(auth);

router.get("/", async (req, res) => {
  const { user_id } = req.user;
  const user = await User.findById(user_id);
  delete user.password;
  delete user.__v;
  return res.json({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    api_key: user.api_key,
  });
});

router.get("/api-key", async (req, res) => {
  const { user_id } = req.user;
  const key = uuidv4();
  const api_key = key.replace(/-/g, "");

  const result = await User.updateOne({ _id: user_id }, { api_key: api_key });

  if (!result) res.status(500).json({ message: "Failed, try again later!" });

  return res.json({ api_key: api_key });
});

router.delete("/api-key", async (req, res) => {
  const { user_id } = req.user;

  const result = await User.updateOne(
    { _id: user_id },
    { api_key: null }
  ).catch((er) => console.log(er));

  if (!result) res.status(500).json({ message: "Failed, try again later!" });

  return res.json({ message: "Api key deleted!" });
});

module.exports = router;
