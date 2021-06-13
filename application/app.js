const express = require('express');
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const testRouter = require('./routes/testRouter');

app.use(express.json());
app.use(flash());

app.use((req, res, next)=>{
    console.log('Hello from the middleware 1👋')
    req.requestTime = new Date().toISOString();
    next();
})

app.use(function (req, res, next) {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use('/api/v1/tests', testRouter);

module.exports = app;



