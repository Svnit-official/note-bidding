const Dean = require("./../models/deanModel");
const Request = require("./../models/requestModel");
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
// const fs = require("fs");
// const jwt = require("jsonwebtoken");
// const secret = process.env.SECRET || "this-is-my-dean-secret";
// const expires = process.env.EXPIRES || 1000;
// const bcrypt = require("bcryptjs");
// const signToken = function (id) {
//   return jwt.sign({ id }, secret, { expiresIn: expires });
// };
const getDate = function () {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();
  const date = dd + "/" + mm + "/" + yyyy;
  return date;
};

const getTime = function () {
  const date = new Date();
  var hours = date.getHours();
  if (hours < 10) hours = "0" + hours.toString();
  var minutes = date.getMinutes();
  if (minutes < 10) minutes = "0" + minutes.toString();
  var seconds = date.getSeconds();
  if (seconds < 10) seconds = "0" + seconds.toString();
  return hours + ":" + minutes + ":" + seconds;
};

///////////////////////////////////////////////////////////////////ROUTE: /login
module.exports.authentication = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({
        status: "bad request",
        requested: req.time,
        message: "please provide username and password",
      });
    }
    const foundDean = await Dean.findOne({ username }).select("+password");
    if (foundDean && await foundDean.correctPassword(password, foundDean.password)){
      // req.params.id = foundDean._id;
      const token = jwt.sign({ id: foundDean._id }, "dean", {
        expiresIn: "2h",
      });
      console.log("loggedIn");
      res.status(200).json({
        status: "success",
        requested: req.time,
        message: "authorised",
        deanID: foundDean._id,
        token,
      });
    } else {
      res.status(401).json({
        status: "unauthorised",
        requested: req.time,
        message: "incorrect username or password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

///////////////////////////////////////////////////////////////////ROUTE: /deanDetails
module.exports.getDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const deanDetails = await Dean.findById(id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        deanDetails,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

module.exports.updateDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const deanDetailsOld = await Dean.findById(id);
    const deanDetailsNew = req.body;
    await Dean.findByIdAndUpdate(id, deanDetailsNew);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /deanDetails",
        deanDetailsOld,
        deanDetailsNew,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

////////////////////////////////////////////////////////////////ROUTE: /pendingRequests
module.exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await Request.find({ status: "approvedByFinance" });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /pendingRequests",
        requests,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

module.exports.approvePendingRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.body.id);
    //const comments = req.body.comments;
    const dean = await Dean.findById(req.params.id);
    dean.respondedRequests.push(request);
    await dean.save();
    request.status= "approvedByDean",
    request.timeline.approvedByDean = { date: getDate(), time: getTime() }; 
    // comments,
  
   // const appRequest = await Request.findById(req.body.id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /respondedRequests",
        //appRequest,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};
module.exports.rejectPendingRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.body.id);
    //const comments = req.body.comments;
    const dean = await Dean.findById(req.params.id);
    const respondedRequests = dean.respondedRequests;
    respondedRequests.push(request);
    await Dean.findByIdAndUpdate(req.params.id, { respondedRequests });
    await Request.findByIdAndUpdate(req.body.id, {
      status: "rejectedByDean",
      //comments,
    });
    //const rejRequest = await Request.findById(req.body.id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /rejectedRequests",
        //rejRequest,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

/////////////////////////////////////////////////////////////////////////ROUTE: /respondedRequests
module.exports.getRespondedRequests = async (req, res) => {
  try {
    const dean = await Dean.findById(req.params.id);
    const requestIds = dean.respondedRequests;
    const requests = await Request.find({ _id: [...requestIds] });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        requests,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};


////////////////////////////////////////////////////////////////////ROUTE: /changePassword
module.exports.authorise = async (req, res) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmPassword) {
      res.status(401).json({
        status: "unauthorized",
        requested: req.requestTime,
        message: "Please provide old and new password",
      });
      return;
    }
    const dean = await Dean.findById(id).select("+password");
    if (await dean.correctPassword(oldPassword, dean.password)) {
      if (newPassword === confirmPassword) {
        const dean = await Dean.findById(id);
        dean.password = newPassword;
        await dean.save();
        res.status(200).json({
          status: "success",
          requested: req.requestTime,
          message: "redirect to home page",
        });
        return;
      } else {
        res.status(400).json({
          status: "failed",
          requested: req.requestTime,
          message: "passwords don't match",
        });
        return;
      }
    } else {
      res.status(401).json({
        status: "unauthorized",
        requested: req.requestTime,
        message: "incorrect password",
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "failed",
      messsage: err,
    });
  }
};

////////////////////////////////////////Route: /getApprovedRequests
module.exports.getApprovedRequests = async (req, res) => {
  try {
    const approvedRequests = await Request.find({
      status: "approvedByDean" ,
    });
    res.status(200).json({
      status: "success",
      data: {
        approvedRequests,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

////////////////////////////////////////Route: /getRejectedRequests
module.exports.getRejectedRequests = async (req, res) => {
  try {
    const rejectedRequests = await Request.find({
      status: "rejectedByDean",
    });
    res.status(200).json({
      status: "success",
      data: {
        rejectedRequests,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};
