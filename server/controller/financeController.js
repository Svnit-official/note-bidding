const Request = require("./../models/requestModel");
const Finance = require("../models/financeModel");

//const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");
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

// const fs = require("fs");
// const jwt = require("jsonwebtoken");
// const secret = process.env.SECRET || "this-is-my-finance-secret";
// const expires = process.env.EXPIRES || 1000;
// // const Faculty = require('./../models/facultyModel');
//const bcrypt = require("bcryptjs");
// const signToken = function (id) {
//   return jwt.sign({ id }, secret, { expiresIn: expires });
// };

///////////////////////////////////////////////////////////////////ROUTE: /login
module.exports.authentication = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({
        status: "bad request",
        requested: req.time,
        message: "please provied username and password",
      });
    }
    const foundFinance = await Finance.findOne({ username }).select("+password");
    if(foundFinance && await foundFinance.correctPassword(password, foundFinance.password)){
      // req.params.id = foundFinance._id;
        const token = jwt.sign({ id: foundFinance._id }, "finance", {
        expiresIn: "2h",
      });
      console.log("loggedIn");
      res.status(200).json({
        status: "success",
        requested: req.time,
        message: "authorised",
        financeID: foundFinance._id,
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

///////////////////////////////////////////////////////////////////ROUTE: /financeDetails
module.exports.getDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const financeDetails = await Finance.findById(id);
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        financeDetails,
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
    const financeDetailsOld = await Finance.findById(id);
    const financeDetailsNew = req.body;
    await Finance.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /financeDetails",
        financeDetailsOld,
        financeDetailsNew,
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
    const requests = await Request.find({ status: "approvedByFaculty" });
    const finance = await Finance.findById(req.params.id)
    const respondedRequests = finance.respondedRequests;
    for (let r in requests) {
      if (respondedRequests.includes(requests[r]._id)) {
        requests[r].new = false;
      }
    }
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

module.exports.sendBackPendingRequest = async (req, res) => {
  try {
    const request = await Request.findById(req.body.id);
    //const comments = req.body.comments;
    const finance = await Finance.findById(req.params.id);
    const respondedRequests = finance.respondedRequests;
    if (!respondedRequests.includes(req.body.id)) {
      finance.respondedRequests.push(req.body.id);
      await finance.save();
    }
    request.status = "sentByFinance"
    await request.save();
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /respondedRequests",
        request,
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
    // const comments = req.body.comments;
    const finance = await Finance.findById(req.params.id);
    if (!finance.respondedRequests.includes(req.body.id)) {
      finance.respondedRequests.push(request._id);
      await finance.save(); 
    }
    request.status = "approvedByFinance",
    request.timeline.approvedByFinance = { date: getDate(), time: getTime() };
    await request.save();
    // comments,
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /respondedRequests",
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
    // const comments = req.body.comments;
    const finance = await Finance.findById(req.params.id);
    if (!finance.respondedRequests.includes(req.body.id)) {
      finance.respondedRequests.push(request);
      await finance.save();
    }
    await Request.findByIdAndUpdate(req.body.id, {
      status: "rejectedByFinance",
      // comments,
    });
    res.status(200).json({
      status: "success",
      requested: req.requestTime,
      data: {
        message: "redirect to /respondedRequests",
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
    const finance = await Finance.findById(req.params.id);
    const requestIds = finance.respondedRequests;
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
    const finance = await Finance.findById(id).select("+password");
    if (await finance.correctPassword(oldPassword, finance.password)) {
      if (newPassword === confirmPassword) {
        const finance = await Finance.findById(id);
        finance.password = newPassword;
        await finance.save();
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

////////////////////////////////////////Route: /getRejectedRequests
module.exports.getRejectedRequests = async (req, res) => {
  try {
    const rejectedRequests = await Request.find({
      status: { $in: ["rejectedByFinance", "rejectedByDean"] },
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