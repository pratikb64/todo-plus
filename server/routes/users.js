const express = require('express');
const router = express.Router();
const { createHmac } = require('crypto');
const secret = process.env.PASSWORD_SECRET;
const User = require('../models/User')


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
		res.json({ message: "Malformatted request!" })

	const user = await User.findOne({ email })

	const hash = createHmac('sha256', secret)
		.update(user.password)
		.digest('hex');

	if (password === hash)
		res.json({ message: "Login successfully!" })
})

router.post('/register', async (req, res) => {
	const { email, first_name, last_name } = req.body

	if (!isValidEmail(email) || !isValidPassword(password))
		res.json({ message: "Malformatted request!" })

	const email_exists = await User.findOne({ email })
	if (email_exists)
		res.json({ message: 'Email already exists!' })

	const password = createHmac('sha256', secret)
		.update(req.body.password)
		.digest('hex');

	User.create({ email, password, first_name, last_name })
		.then(() => res.json({ message: 'Account created successfully!' })).catch(er => {
			console.log(er)
			res.status(500).json({ message: 'Server error try again later!' })
		})

})


module.exports = router;
