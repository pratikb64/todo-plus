require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const cookieParser = require("cookie-parser");
require("./config/database").connect();


app.get('/', (req, res) => {
	res.json({ message: 'Express server...' })
})



const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Server Listening on ${port}`)
});
