require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const cookieParser = require("cookie-parser");
require("./config/database").connect();
const user = require('./routes/users')

app.use(express.json())

app.get('/', (req, res) => {
	res.json({ message: 'Express server...' })
})

app.use('/', user)


const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Server Listening on ${port}`)
});
