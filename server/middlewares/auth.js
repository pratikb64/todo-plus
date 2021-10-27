const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
  const api_key = req.query.token || req.headers["token"];

  if (api_key) {
    let isKeyValid = await User.findOne({ api_key: api_key });
    req.user = {};
    if (isKeyValid) {
      req.api_key = api_key;
      req.user.user_id = isKeyValid._id;
      req.user.email = isKeyValid.email;
      return next();
    }
    return res.status(403).send("Access denied!");
  }

  let token = null;
  if (req.headers.cookie) token = req.headers.cookie.split("=")[1];

  if (!token) {
    return res.status(403).send("Access denied!");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid token!");
  }
  return next();
};

module.exports = verifyToken;
