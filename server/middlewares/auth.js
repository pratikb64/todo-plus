const jwt = require("jsonwebtoken");
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
	const token = req.query.token || req.headers["session-token"];
	const api_key = req.headers["x-access-token"] || req.headers["authorization"]

	if (api_key) {
		let isKeyValid = await User.findOne({ api_key: api_key })
		if (isKeyValid)
			return next()
	}

	if (!token) {
		return res.status(403).send("A token is required for authentication");
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded;
	} catch (err) {
		return res.status(401).send("Invalid Token");
	}
	return next();
};

module.exports = verifyToken;
