require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors')
const cookieParser = require("cookie-parser");
require("./config/database").connect();

const user = require('./routes/users')
const todo = require('./routes/todo')
const auth = require('./middlewares/auth')

app.use(cors({
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200,
	credentials: true
}))
app.use(express.json())

app.get('/', (req, res) => {
	res.json({ message: 'Welcome to Todo Plus server!' })
})

app.use('/v1/user', user)

app.use(auth)

app.use('/v1/todo', todo)


const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Server Listening on ${port}`)
});
