require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("./config/database").connect();
const rateLimit = require("express-rate-limit");
const { shouldSendSameSiteNone } = require("should-send-same-site-none");

const user = require("./routes/users");
const todo = require("./routes/todo");
const auth = require("./middlewares/auth");

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "https://todo-plus.netlify.app",
    ],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(shouldSendSameSiteNone);
app.use(cookieParser());
app.use(express.json());

const apiRequestLimiter = rateLimit({
  windowMs: 1 * 60 * 60 * 1000, // 60 minutes
  max: 100, // limit each IP to 'n' requests per windowMs
  keyGenerator: (req, res) => {
    return req.api_key || req.ip;
  },
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Todo Plus server!" });
});

app.use("/v1/user", user);

app.use(auth);

app.use(apiRequestLimiter);

app.use("/v1/todo", todo);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
