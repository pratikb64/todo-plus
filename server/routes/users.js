const express = require('express');
const router = express.Router();
const { createHmac } = require('crypto');
const secret = process.env.PASSWORD_SECRET;
const User = require('../models/User')
const jwt = require("jsonwebtoken");

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


router.post('/login', async (req, res) => {
	const { email, password } = req.body

	if (!isValidEmail(email))
		return res.status(406).json({ message: "Enter valid email address" })

	const user = await User.findOne({ email })

	if (!user)
		return res.status(404).json({ message: "User not found check your email address!" })

	const hash = createHmac('sha256', secret)
		.update(password)
		.digest('hex');

	if (user.password !== hash)
		return res.status(400).json({ message: "Incorrect email or password!" })

	const sevenDaysToSeconds = 24 * 60 * 60 * 7;
	const token = jwt.sign(
		{ user_id: user._id, email },
		process.env.JWT_SECRET,
		{
			expiresIn: "7d",
		}
	);

	return res.cookie('session-token', token, {
		maxAge: sevenDaysToSeconds,
		httpOnly: true
		/* ,
		secure: process.env.NODE_ENV === 'production' ? true : false */
	}).json({ message: "Logged in successfully!" })
})



router.post('/register', async (req, res) => {
	const { email, password, first_name, last_name } = req.body

	if (!isValidEmail(email) || !isValidPassword(password))
		return res.status(406).json({ message: "Invalid email or password!" })

	const email_exists = await User.findOne({ email })
	if (email_exists)
		return res.status(409).json({ message: 'Email already exists!' })

	const hash = createHmac('sha256', secret)
		.update(password)
		.digest('hex');

	User.create({ email: email.toLowerCase(), password: hash, first_name, last_name })
		.then(() => res.json({ message: 'Account created successfully!' })).catch(er => {
			console.log(er)
			return res.status(500).json({ message: 'Server error try again later!' })
		})

})


module.exports = router;
