require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const cookieParser = require("cookie-parser");
require("./config/database").connect();

const user = require('./routes/users')
const todo = require('./routes/todo')

app.use(express.json())

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Todo Plus server!' })
})

app.use('/v1/user', user)
app.use('/v1/todo', todo)


const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Server Listening on ${port}`)
});
