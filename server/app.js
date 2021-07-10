const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
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

app.use(express.json());
app.use(flash());

app.use((req, res, next) => {
  console.log("Hello from the index page middleware 👋");
  req.requestTime = new Date().toISOString();
  next();
});

// app.use(function (req, res, next) {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   res.locals.currentUser = req.user;
//   next();
// });

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/api/v1/club", clubRouter);
app.use("/api/v1/faculty", facultyRouter);
app.use("/api/v1/finance", financeRouter);
app.use("/api/v1/dean", deanRouter);

module.exports = app;
