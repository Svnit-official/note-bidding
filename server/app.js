const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fileupload = require("express-fileupload");
const mongodb = require("mongodb");
const fs = require("fs");
app.use(fileupload());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const clubRouter = require("./routes/clubRouter");
const facultyRouter = require("./routes/facultyRouter");
const financeRouter = require("./routes/financeRouter");
const deanRouter = require("./routes/deanRouter");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
app.use(express.json());
app.use(cookieParser());
app.use(flash());
const sessionconfig = {
  name: "session",
  secret: "mysecret",
  resave: false,
  cacheLocation: "localStorage",
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionconfig));
app.use((req, res, next) => {
  console.log("Hello from the index page middleware 👋");
  req.requestTime = new Date().toISOString();
  next();
});

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/api/v1/club", clubRouter);
app.use("/api/v1/faculty", facultyRouter);
app.use("/api/v1/finance", financeRouter);
app.use("/api/v1/dean", deanRouter);

module.exports = app;
